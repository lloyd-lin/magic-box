"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _electron = require("electron");

module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理

  /**
  *
  *
  * @param {object} requestDetail
  * @param {string} requestDetail.protocol
  * @param {object} requestDetail.requestOptions
  * @param {object} requestDetail.requestData
  * @param {object} requestDetail.response
  * @param {number} requestDetail.response.statusCode
  * @param {object} requestDetail.response.header
  * @param {buffer} requestDetail.response.body
  * @returns
  */
  beforeSendRequest:
  /*#__PURE__*/
  _regenerator["default"].mark(function beforeSendRequest(requestDetail) {
    return _regenerator["default"].wrap(function beforeSendRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (~requestDetail.url.indexOf('perf.lu.com') && !~requestDetail.url.indexOf('pharos')) {
              try {
                magicWindow.webContents.send('http.beforeSendRequest', requestDetail);
              } catch (e) {
                console.log(e);
              }

              console.log('proxyRule', requestDetail.url);
            }

            return _context.abrupt("return", null);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, beforeSendRequest);
  }),
  // 发送响应前处理
  beforeSendResponse:
  /*#__PURE__*/
  _regenerator["default"].mark(function beforeSendResponse(requestDetail, responseDetail) {
    return _regenerator["default"].wrap(function beforeSendResponse$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, beforeSendResponse);
  }),
  // 是否处理https请求
  beforeDealHttpsRequest:
  /*#__PURE__*/
  _regenerator["default"].mark(function beforeDealHttpsRequest(requestDetail) {
    return _regenerator["default"].wrap(function beforeDealHttpsRequest$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", true);

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, beforeDealHttpsRequest);
  }),
  // 请求出错的事件
  onError:
  /*#__PURE__*/
  _regenerator["default"].mark(function onError(requestDetail, error) {
    return _regenerator["default"].wrap(function onError$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, onError);
  }),
  // https连接服务器出错
  onConnectError:
  /*#__PURE__*/
  _regenerator["default"].mark(function onConnectError(requestDetail, error) {
    return _regenerator["default"].wrap(function onConnectError$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
          case "end":
            return _context5.stop();
        }
      }
    }, onConnectError);
  })
};