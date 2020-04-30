"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Prefix = _interopRequireDefault(require("./Prefix"));

var _Hijack = _interopRequireDefault(require("./Hijack"));

require("./index.css");

var PropTypes = _interopRequireWildcard(require("prop-types"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ScrollNumber = function ScrollNumber(props) {
  var numAnimationConfig = props.numAnimationConfig,
      linkage = props.linkage,
      direction = props.direction,
      value = props.value,
      increment = props.increment,
      onAnimationEnd = props.onAnimationEnd,
      onAnimationAllEnd = props.onAnimationAllEnd,
      title = props.title,
      symbol = props.symbol,
      titleStyle = props.titleStyle,
      openLot = props.openLot,
      contentStyle = props.contentStyle,
      height = props.height,
      style = props.style,
      duration = props.duration,
      defalutAnimation = {
    //Default parameter
    animationDuration: linkage ? 10 : 1,
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
    animationIterationCount: 1,
    animationDelay: 0
  },
      valueArray = value.toString().split('');
  var executeLength = 0;

  function directionStyle(numAnimationConfig, number, index, valueArray) {
    var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
    var numberItem = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {},
        count = 0,
        last = false,
        spike = 1;
    var animConfig = {
      animationName: "number".concat(10),
      animationDuration: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDuration) || defalutAnimation.animationDuration,
      animationTimingFunction: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationTimingFunction) || defalutAnimation.animationTimingFunction,
      animationFillMode: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationFillMode) || defalutAnimation.animationFillMode,
      animationIterationCount: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationIterationCount) || defalutAnimation.animationIterationCount,
      animationDelay: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDelay) || defalutAnimation.animationDelay
    };

    if (dir !== 'left') {
      for (var i = index - 1; i >= 0; i--) {
        count += valueArray[i] * spike;
        spike *= 10;
      }

      last = index === 0 ? true : false;
    } else {
      var zeroIndex = checkZero(valueArray);

      if (zeroIndex >= index) {
        for (var _i = index; _i <= zeroIndex; _i++) {
          count += valueArray[_i] * spike;
          spike *= 10;
        }

        if (zeroIndex == index) last = true;
      } else {
        count = 0;
      }
    }

    if (last) {
      count = 1;
      animConfig.animationDuration = animConfig.animationDuration;
      animConfig.animationName = undefined;
    } else {
      var _duration = animConfig.animationDuration / (count + 1);

      var lastDuration = _duration / 10 * number;
      animConfig.animationDuration = _duration + (_duration - lastDuration) / (count == 0 ? 1 : count);
      animConfig.lastDuration = lastDuration;
    }

    animConfig.value = number;
    animConfig.animationIterationCount = count;
    animConfig.haveRedundant = !last;
    return {
      style: createStyle(animConfig, number),
      config: animConfig
    };
  }

  function checkZero(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != 0) return i;
    }

    return -1;
  }

  function lotNumber(numAnimationConfig, number, index, valueArray) {
    var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'left';
    var idleNum = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
    var numberItem = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {};
    var animConfig = {
      animationName: "number".concat(10),
      animationDuration: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDuration) || defalutAnimation.animationDuration,
      animationTimingFunction: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationTimingFunction) || defalutAnimation.animationTimingFunction,
      animationFillMode: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationFillMode) || defalutAnimation.animationFillMode,
      animationIterationCount: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationIterationCount) || defalutAnimation.animationIterationCount,
      animationDelay: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDelay) || defalutAnimation.animationDelay
    };
    animConfig.lastDuration = animConfig.animationDuration;
    animConfig.value = number;
    animConfig.animationIterationCount = dir === 'left' ? animConfig.animationIterationCount * (index + 1) + idleNum : animConfig.animationIterationCount * (valueArray.length - index + 1) + idleNum;
    animConfig.haveRedundant = true;
    return {
      style: createStyle(animConfig, number),
      config: animConfig
    };
  }

  function findNumber(arr, number) {
    for (var i = 0; i < arr.length; ++i) {
      var item = arr[i];
      if (item.value == number) return item;
    }

    return null;
  }

  function normalStyle(numAnimationConfig, duration, number) {
    var numberItem = findNumber(numAnimationConfig, number);
    var animConfig = {
      animationDuration: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDuration) || duration || defalutAnimation.animationDuration,
      animationTimingFunction: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationTimingFunction) || defalutAnimation.animationTimingFunction,
      animationFillMode: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationFillMode) || defalutAnimation.animationFillMode,
      animationIterationCount: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationIterationCount) || defalutAnimation.animationIterationCount,
      animationDelay: (numberItem === null || numberItem === void 0 ? void 0 : numberItem.animationDelay) || defalutAnimation.animationDelay
    };
    animConfig.haveRedundant = false;
    return {
      style: createStyle(animConfig, number),
      config: animConfig
    };
  }

  function animationExecuteEnd(config, e) {
    var target = e.target;

    if (config.haveRedundant) {
      config.animationName = "number".concat(config.value);
      config.animationDuration = config.lastDuration;
      config.animationIterationCount = 1;
      var animConfig = createStyle(config, config.value);

      for (var key in animConfig) {
        target.style[key] = animConfig[key];
      }

      config.haveRedundant = false;
    } else {
      onAnimationEnd === null || onAnimationEnd === void 0 ? void 0 : onAnimationEnd(config.value, e.target);
      executeLength++;
      if (executeLength === valueArray.length - 1) onAnimationAllEnd === null || onAnimationAllEnd === void 0 ? void 0 : onAnimationAllEnd(true); // executeLength++ === valueArray.length - 1 ? onAnimationAllEnd?.(true) : '';
    }
  }

  function createStyle(animConfig, number) {
    var style = {};

    for (var i = 0; i < _Prefix["default"].length; ++i) {
      var item = _Prefix["default"][i];
      style["".concat(item, "animationName")] = animConfig.animationName || "number".concat(number);
      style["".concat(item, "animationDuration")] = animConfig.animationDuration + 's';
      style["".concat(item, "animationFillMode")] = animConfig.animationFillMode;
      style["".concat(item, "animationIterationCount")] = animConfig.animationIterationCount;
      style["".concat(item, "animationDelay")] = animConfig.animationDelay + 's';
      style["".concat(item, "animationTimingFunction")] = animConfig.animationTimingFunction;
    }

    return style;
  }

  function numberList(item, index) {
    var style = {};

    if (linkage) {
      style = directionStyle(numAnimationConfig, item, index, valueArray, direction);
    } else if (openLot) {
      style = lotNumber(numAnimationConfig, item, index, valueArray, direction, increment);
    } else {
      style = normalStyle(numAnimationConfig, duration, item);
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "scrollNumer scroll".concat(item),
      key: index
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "number",
      onAnimationEnd: animationExecuteEnd.bind(this, style.config),
      style: _objectSpread({}, style.style)
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: index
      }, item);
    })));
  }

  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scrollBox",
    style: _objectSpread({
      fontSize: height
    }, style)
  }, title ? /*#__PURE__*/_react["default"].createElement("label", {
    style: _objectSpread({}, titleStyle)
  }, title) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scrollContent",
    style: _objectSpread({}, contentStyle)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "symbol"
  }, symbol == '+' ? '' : symbol), valueArray.map(function (item, index) {
    return numberList(item, index);
  }))));
};

ScrollNumber.propTypes = {
  numAnimationConfig: PropTypes.oneOfType([//Animation configuration parameters
  PropTypes.array, PropTypes.object]),
  linkage: PropTypes.bool,
  //Whether to enable linkage。After opening, only the 0th parameter configuration takes effect。
  direction: PropTypes.string,
  //direction
  value: PropTypes.number.isRequired,
  //The value to scroll
  increment: PropTypes.number,
  //Effective when openLot is turned on, how many turns the front roll does not move
  onAnimationEnd: PropTypes.func,
  //Single digital animation execution end callback。
  onAnimationAllEnd: PropTypes.func,
  //All content execution end callback。
  title: PropTypes.string,
  //title
  symbol: PropTypes.oneOfType([//Digitally signed symbols
  PropTypes.string, PropTypes.element]),
  titleStyle: PropTypes.object,
  //title style
  openLot: PropTypes.bool,
  //Whether to turn on the number sign effect。
  contentStyle: PropTypes.object,
  //content style
  height: PropTypes.number,
  //Height, setting this height will affect the font size, the default is 30
  style: PropTypes.object,
  duration: PropTypes.number //Normal style execution time

};

var _default = (0, _Hijack["default"])(ScrollNumber);

exports["default"] = _default;