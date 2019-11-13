"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _electron = require("electron");

var _anyproxy = _interopRequireDefault(require("anyproxy"));

var exec = require('child_process').exec;

var proxyServer = null;

var createServer = function createServer() {
  var options = {
    port: 8001,
    rule: require('./proxyRule'),
    dangerouslyIgnoreUnauthorized: true,
    webInterface: {
      enable: true,
      webPort: 8002
    },
    throttle: 10000,
    forceProxyHttps: true,
    wsIntercept: false,
    // 不开启websocket代理
    silent: true
  };
  proxyServer = new _anyproxy["default"].ProxyServer(options);
  proxyServer.on('ready', function () {
    var httpsProxy = "http://127.0.0.1:8001,direct://";
    var httpProxy = "http://127.0.0.1:8001,direct://";

    _electron.session.defaultSession.setProxy({
      proxyRules: "http=".concat(httpProxy, ";https=").concat(httpsProxy)
    }, function () {
      return console.log("Proxy listening , upstream proxy http=".concat(httpProxy, ";https=").concat(httpsProxy));
    });
  });
  proxyServer.on('error', function (e) {
    consolelog('proxyServerError');
  });
  proxyServer.start();
};

if (!_anyproxy["default"].utils.certMgr.ifRootCAFileExists()) {
  _anyproxy["default"].utils.certMgr.generateRootCA(function (error, keyPath) {
    // let users to trust this CA before using proxy
    if (!error) {
      var certDir = require('path').dirname(keyPath);

      console.log('The cert is generated at', certDir);
      var isWin = /^win/.test(process.platform);

      if (isWin) {
        exec('start .', {
          cwd: certDir
        });
      } else {
        exec('open .', {
          cwd: certDir
        });
      }
    } else {
      console.error('error when generating rootCA', error);
    }
  });
}

_electron.app.closeProxy = function () {
  console.log('close proxy');
  proxyServer && proxyServer.close();
};

_electron.app.createServer = function () {
  console.log('new proxy');
  createServer();
};