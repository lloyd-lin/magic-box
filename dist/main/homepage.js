"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = require("prop-types");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color:black;\n  display: block;\n  flex: 1;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    width: 375px;\n    height: 812px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display:flex;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WebView = require('react-electron-web-view'); // import './homepage.css';


var ChannelContainer = _styledComponents["default"].div(_templateObject());

var ChannelView = _styledComponents["default"].div(_templateObject2());

var ChannelPlugin = _styledComponents["default"].div(_templateObject3());

var MyApp =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MyApp, _React$Component);

  function MyApp() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MyApp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MyApp)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "webview", _react["default"].createRef());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      url: 'https://m.lu.com/pachannel/home#/',
      key: 0
    });
    return _this;
  }

  (0, _createClass2["default"])(MyApp, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(ChannelContainer, null, _react["default"].createElement(ChannelView, null, _react["default"].createElement(WebView, {
        className: "channel-webview",
        src: this.state.url,
        key: 'key',
        ref: this.webview,
        style: {
          width: '100%',
          height: '100%',
          position: 'relative'
        },
        onDidAttach: function onDidAttach() {
          console.log('Did attach');
        }
      })), _react["default"].createElement(ChannelPlugin, null));
    }
  }]);
  return MyApp;
}(_react["default"].Component);

_reactDom["default"].render(_react["default"].createElement(MyApp, null), document.getElementById('app'));