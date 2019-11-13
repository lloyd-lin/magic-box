'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var EasyCert = require('node-easy-cert');

var co = require('co');

var os = require('os');

var inquirer = require('inquirer');

var util = require('./utils');

var options = {
  rootDirPath: util.getProxyPath('certificates'),
  inMemory: false,
  defaultCertAttrs: [{
    name: 'countryName',
    value: 'CN'
  }, {
    name: 'organizationName',
    value: 'LufaxChannel'
  }, {
    shortName: 'ST',
    value: 'SH'
  }, {
    shortName: 'OU',
    value: 'LufaxChannel SSL Proxy'
  }]
};
var easyCert = new EasyCert(options);
var crtMgr = Object.assign({}, easyCert); // rename function

crtMgr.ifRootCAFileExists = easyCert.isRootCAFileExists;

crtMgr.generateRootCA = function (cb) {
  doGenerate(false); // set default common name of the cert

  function doGenerate(overwrite) {
    var rootOptions = {
      commonName: 'LufaxChannel',
      overwrite: !!overwrite
    };
    easyCert.generateRootCA(rootOptions, function (error, keyPath, crtPath) {
      cb(error, keyPath, crtPath);
    });
  }
};

crtMgr.getCAStatus =
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee2() {
  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", co(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            var result, ifExist;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    result = {
                      exist: false
                    };
                    ifExist = easyCert.isRootCAFileExists();

                    if (ifExist) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt("return", result);

                  case 6:
                    result.exist = true;

                    if (/^win/.test(process.platform)) {
                      _context.next = 11;
                      break;
                    }

                    _context.next = 10;
                    return easyCert.ifRootCATrusted;

                  case 10:
                    result.trusted = _context.sent;

                  case 11:
                    return _context.abrupt("return", result);

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
});
/**
 * trust the root ca by command
 */

crtMgr.trustRootCA =
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee3() {
  var platform, rootCAPath, trustInquiry, answer, result;
  return _regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          platform = os.platform();
          rootCAPath = crtMgr.getRootCAFilePath();
          trustInquiry = [{
            type: 'list',
            name: 'trustCA',
            message: 'The rootCA is not trusted yet, install it to the trust store now?',
            choices: ['Yes', "No, I'll do it myself"]
          }];

          if (!(platform === 'darwin')) {
            _context3.next = 8;
            break;
          }

          _context3.next = 6;
          return inquirer.prompt(trustInquiry);

        case 6:
          answer = _context3.sent;

          if (answer.trustCA === 'Yes') {
            console.log('About to trust the root CA, this may requires your password'); // https://ss64.com/osx/security-cert.html

            result = util.execScriptSync("sudo security add-trusted-cert -d -k /Library/Keychains/System.keychain ".concat(rootCAPath));

            if (result.status === 0) {
              console.log('Root CA install, you are ready to intercept the https now');
            } else {
              console.error(result);
              console.log('Failed to trust the root CA, please trust it manually');
            }
          } else {
            console.log('Please trust the root CA manually so https interception works');
          }

        case 8:
          if (/^win/.test(process.platform)) {
            console.log('You can install the root CA manually.');
          }

          console.log('The root CA file path is: ' + crtMgr.getRootCAFilePath());

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
});
module.exports = crtMgr;