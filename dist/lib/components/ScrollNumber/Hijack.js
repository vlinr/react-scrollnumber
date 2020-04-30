"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Hijack = function Hijack(WrappedComponent) {
  return /*#__PURE__*/function (_Component) {
    (0, _inherits2["default"])(_class, _Component);

    var _super = _createSuper(_class);

    function _class(props) {
      (0, _classCallCheck2["default"])(this, _class);
      return _super.call(this, props);
    }

    (0, _createClass2["default"])(_class, [{
      key: "render",
      value: function render() {
        var props = _objectSpread({}, this.props, {
          numAnimationConfig: this.props.numAnimationConfig || [],
          linkage: this.props.linkage || false,
          direction: this.props.direction || 'left',
          increment: this.props.increment || 1,
          symbol: this.props.symbol || '+',
          openLot: this.props.openLot || false,
          titleStyle: this.props.titleStyle || {},
          contentStyle: this.props.contentStyle || {},
          height: this.props.height || 30,
          duration: this.props.duration || 2,
          style: this.props.style || {}
        });

        return /*#__PURE__*/_react["default"].createElement(WrappedComponent, props);
      }
    }]);
    return _class;
  }(_react.Component);
};

var _default = Hijack;
exports["default"] = _default;