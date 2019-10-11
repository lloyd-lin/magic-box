"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _mobx = require("mobx");

var _dec, _class, _descriptor, _temp;

var UrlStore = (_dec = _mobx.action.bound, (_class = (_temp =
/*#__PURE__*/
function () {
  function UrlStore() {
    (0, _classCallCheck2["default"])(this, UrlStore);
    (0, _defineProperty2["default"])(this, "urlGroup", (0, _initializerWarningHelper2["default"])(_descriptor, this));
  }

  (0, _createClass2["default"])(UrlStore, [{
    key: "appendUrl",
    value: function appendUrl(url) {
      urlGroup = urlGroup.concat(urlGroup, [url]);
    }
  }]);
  return UrlStore;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "urlGroup", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), (0, _applyDecoratedDescriptor2["default"])(_class.prototype, "appendUrl", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "appendUrl"), _class.prototype)), _class));
var _default = UrlStore;
exports["default"] = _default;