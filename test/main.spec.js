'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var mockery = require('mockery');
var Q = require('q');

chai.use(require('sinon-chai'));

describe('nachos-api', function () {
  describe('exports', function () {
    it('should expose the api', function () {
      var nachosApi = require('../lib');

      expect(nachosApi).to.not.be.empty;
      expect(nachosApi.settings).to.be.a('function');
      expect(nachosApi.system).to.be.an('object');
      expect(nachosApi.on).to.be.a('function');
      expect(nachosApi.emit).to.be.a('function');
      expect(nachosApi.removeListener).to.be.a('function');
      expect(nachosApi.server).to.be.an('object');
    });
  });

  describe('custom events', function () {
    var nachosApi;
    var currentSocketClientMock;

    before(function () {
      var nachosConfigMock = {
        getSync: sinon.stub().returns({port: '1234'})
      };

      var socketClientMock = function () {
        currentSocketClientMock = {
          on: sinon.stub(),
          emit: sinon.stub(),
          removeListener: sinon.stub()
        };

        return currentSocketClientMock;
      };

      mockery.registerMock('nachos-config', nachosConfigMock);
      mockery.registerMock('socket.io-client', socketClientMock);
      mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
      });

      nachosApi = require('../lib');
    });

    after(function () {
      mockery.deregisterMock('nachos-config');
      mockery.deregisterMock('socket.io-client');
      mockery.disable();
    });

    it('should add \'custom.\' to name on register', function () {
      var cb = function () {
      };

      nachosApi.on('test', cb);

      expect(currentSocketClientMock.on).to.have.been.calledWith('custom.test', cb);
    });

    it('should emit custom event with \'custom.\' added to the name and wrapped data', function () {
      var data = {test: 'test'};

      nachosApi.emit('test', data);

      expect(currentSocketClientMock.emit).to.have.been.calledWith('custom.test', {name: 'test', data: data});
    });

    it('should remove listener event with \'custom.\' added to the name', function () {
      var cb = function () {
      };

      nachosApi.removeListener('test', cb);

      expect(currentSocketClientMock.removeListener).to.have.been.calledWith('custom.test', cb);
    });
  });

  describe('settings', function () {
    var nachosApi;
    var currentSocketClientMock;

    before(function () {
      var settingsFileMock = function () {
        return {
          save: sinon.stub().returns(Q.resolve()),
          instance: function (id) {
            return {
              _id: id,
              save: sinon.stub().returns(Q.resolve())
            };
          }
        };
      };

      var nachosConfigMock = {
        getSync: sinon.stub().returns({port: '1234'})
      };

      var socketClientMock = function () {
        currentSocketClientMock = {
          on: sinon.stub(),
          emit: sinon.stub(),
          removeListener: sinon.stub()
        };

        return currentSocketClientMock;
      };

      mockery.registerMock('nachos-config', nachosConfigMock);
      mockery.registerMock('socket.io-client', socketClientMock);
      mockery.registerMock('nachos-settings-file', settingsFileMock);
      mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
      });

      nachosApi = require('../lib');
    });

    after(function () {
      mockery.deregisterMock('nachos-config');
      mockery.deregisterMock('socket.io-client');
      mockery.deregisterMock('nachos-settings-file');
      mockery.disable();
    });

    it('should hook save and emit config.global-changed event', function () {
      var config = {test: 'test'};

      return nachosApi.settings('test')
        .save(config)
        .then(function () {
          expect(currentSocketClientMock.emit).to.have.been.calledWith('config.global-changed', {
            app: 'test',
            config: config
          });
        });
    });

    it('should enable onChange registration', function () {
      var cb = function () {
      };

      nachosApi.settings('test').onChange(cb);

      expect(currentSocketClientMock.on).to.have.been.calledWith('settings.global-changed:test', cb);
    });

    it('should hook instance save and emit config.instance-changed event', function () {
      var config = {test: 'test'};

      return nachosApi.settings('test')
        .instance('testId')
        .save(config)
        .then(function () {
          expect(currentSocketClientMock.emit).to.have.been.calledWith('settings.instance-changed:testId', {
            instance: 'testId',
            config: config
          });
        });
    });

    it('should enable instance onChange registration', function () {
      var cb = function () {
      };

      nachosApi.settings('test').instance('testId').onChange(cb);

      expect(currentSocketClientMock.on).to.have.been.calledWith('settings.instance-changed:testId', cb);
    });
  });

  describe('server', function () {
    describe('with token in config', function () {
      var nachosApi;
      var setTokenStub = sinon.stub();

      before(function () {
        var nachosConfigMock = {
          getSync: sinon.stub().returns({port: '1234', token: 'test'})
        };

        var serverApiMock = function () {
          return {
            setToken: setTokenStub,
            connected: sinon.stub().returns(true)
          };
        };

        mockery.registerMock('nachos-server-api', serverApiMock);
        mockery.registerMock('nachos-config', nachosConfigMock);
        mockery.enable({
          useCleanCache: true,
          warnOnReplace: false,
          warnOnUnregistered: false
        });

        nachosApi = require('../lib');
      });

      after(function () {
        mockery.registerMock('nachos-server-api');
        mockery.deregisterMock('nachos-config');
        mockery.disable();
      });

      it('should be connected', function () {
        expect(setTokenStub).to.have.been.calledWith('test');
      });
    });

    describe('without token in config', function () {
      var nachosApi;
      var setTokenStub = sinon.stub();

      before(function () {
        var nachosConfigMock = {
          getSync: sinon.stub().returns({port: '1234'})
        };

        var serverApiMock = function () {
          return {
            setToken: setTokenStub,
            connected: sinon.stub().returns(false)
          };
        };

        mockery.registerMock('nachos-server-api', serverApiMock);
        mockery.registerMock('nachos-config', nachosConfigMock);
        mockery.enable({
          useCleanCache: true,
          warnOnReplace: false,
          warnOnUnregistered: false
        });

        nachosApi = require('../lib');
      });

      after(function () {
        mockery.registerMock('nachos-server-api');
        mockery.deregisterMock('nachos-config');
        mockery.disable();
      });

      it('should not be connected', function () {
        expect(setTokenStub).to.have.not.been.called;
      });
    });
  });
});