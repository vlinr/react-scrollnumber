import React, { Fragment, Component } from 'react'
import prefix from './Prefix';
import Hijack from './Hijack';
import './index.less';
import * as PropTypes from 'prop-types';
const ScrollNumber = (props) => {
    const {
        numAnimationConfig, linkage, direction, value, increment,
        onAnimationEnd, onAnimationAllEnd, title, symbol, titleStyle,
        openLot, contentStyle, height, style, duration
    } = props,
        defalutAnimation = { //Default parameter
            animationDuration: linkage ? 10 : 1,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationIterationCount: 1,
            animationDelay: 0
        }, valueArray = value.toString().split('');
    let executeLength = 0;

    function directionStyle(numAnimationConfig, number, index, valueArray, dir = 'left') {
        let numberItem = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {},
            count = 0, last = false, spike = 1;
        let animConfig = {
            animationName: `number${10}`,
            animationDuration: numberItem?.animationDuration || defalutAnimation.animationDuration,
            animationTimingFunction: numberItem?.animationTimingFunction || defalutAnimation.animationTimingFunction,
            animationFillMode: numberItem?.animationFillMode || defalutAnimation.animationFillMode,
            animationIterationCount: numberItem?.animationIterationCount || defalutAnimation.animationIterationCount,
            animationDelay: numberItem?.animationDelay || defalutAnimation.animationDelay,
        }
        if (dir !== 'left') {
            for (let i = (index - 1); i >= 0; i--) {
                count += valueArray[i] * spike;
                spike *= 10;
            }
            last = index === 0 ? true : false;
        } else {
            let zeroIndex = checkZero(valueArray);
            if (zeroIndex >= index) {
                for (let i = index; i <= zeroIndex; i++) {
                    count += valueArray[i] * spike;
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
        }
        else {
            let duration = animConfig.animationDuration / (count + 1);
            let lastDuration = duration / 10 * number;
            animConfig.animationDuration = duration + (duration - lastDuration) / (count == 0 ? 1 : count);
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
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] != 0) return i;
        }
        return -1;
    }

    function lotNumber(numAnimationConfig, number, index, valueArray, dir = 'left', idleNum = 3) {
        let numberItem = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {};
        let animConfig = {
            animationName: `number${10}`,
            animationDuration: numberItem?.animationDuration || defalutAnimation.animationDuration,
            animationTimingFunction: numberItem?.animationTimingFunction || defalutAnimation.animationTimingFunction,
            animationFillMode: numberItem?.animationFillMode || defalutAnimation.animationFillMode,
            animationIterationCount: numberItem?.animationIterationCount || defalutAnimation.animationIterationCount,
            animationDelay: numberItem?.animationDelay || defalutAnimation.animationDelay,
        }
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
        for (let i = 0; i < arr.length; ++i) {
            let item = arr[i];
            if (item.value == number) return item
        }
        return null;
    }

    function normalStyle(numAnimationConfig, duration, number) {
        let numberItem = findNumber(numAnimationConfig, number);
        let animConfig = {
            animationDuration: numberItem?.animationDuration || duration || defalutAnimation.animationDuration,
            animationTimingFunction: numberItem?.animationTimingFunction || defalutAnimation.animationTimingFunction,
            animationFillMode: numberItem?.animationFillMode || defalutAnimation.animationFillMode,
            animationIterationCount: numberItem?.animationIterationCount || defalutAnimation.animationIterationCount,
            animationDelay: numberItem?.animationDelay || defalutAnimation.animationDelay,
        }
        animConfig.haveRedundant = false;
        return {
            style: createStyle(animConfig, number),
            config: animConfig
        };
    }

    function animationExecuteEnd(config, e) {
        let target = e.target;
        if (config.haveRedundant) {
            config.animationName = `number${config.value}`;
            config.animationDuration = config.lastDuration;
            config.animationIterationCount = 1;
            let animConfig = createStyle(config, config.value);
            for (let key in animConfig) target.style[key] = animConfig[key];
            config.haveRedundant = false;
        } else {
            onAnimationEnd?.(config.value, e.target);
            executeLength++;
            if(executeLength === valueArray.length - 1)onAnimationAllEnd?.(true);
            // executeLength++ === valueArray.length - 1 ? onAnimationAllEnd?.(true) : '';
        }
    }

    function createStyle(animConfig, number) {
        let style = {};
        for (let i = 0; i < prefix.length; ++i) {
            let item = prefix[i];
            style[`${item}animationName`] = animConfig.animationName || `number${number}`;
            style[`${item}animationDuration`] = animConfig.animationDuration + 's';
            style[`${item}animationFillMode`] = animConfig.animationFillMode;
            style[`${item}animationIterationCount`] = animConfig.animationIterationCount;
            style[`${item}animationDelay`] = animConfig.animationDelay + 's';
            style[`${item}animationTimingFunction`] = animConfig.animationTimingFunction;
        }
        return style;
    }

    function numberList(item, index) {
        let style = {};
        if (linkage) {
            style = directionStyle(numAnimationConfig, item, index, valueArray, direction);
        } else if (openLot) {
            style = lotNumber(numAnimationConfig, item, index, valueArray, direction, increment);
        } else {
            style = normalStyle(numAnimationConfig, duration, item);
        }
        return (
            <div className={`scrollNumer scroll${item}`} key={index}>
                <div className="number" onAnimationEnd={animationExecuteEnd.bind(this, style.config)} style={{ ...style.style }}>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => <span key={index}>{item}</span>)
                    }
                </div>
            </div>
        );
    }
    return (
        <Fragment>
            <div className='scrollBox' style={{ fontSize: height, ...style }}>
                {title ? <label style={{ ...titleStyle }}>{title}</label> : null}
                <div className="scrollContent" style={{ ...contentStyle }}>
                    {
                        <div className="symbol">{symbol == '+' ? '' : symbol}</div>
                    }
                    {
                        valueArray.map((item, index) => numberList(item,index))
                    }
                </div>
            </div>
        </Fragment>
    )
}
ScrollNumber.propTypes = {
    numAnimationConfig: PropTypes.oneOfType([  //Animation configuration parameters
        PropTypes.array,
        PropTypes.object
    ]),
    linkage: PropTypes.bool,//Whether to enable linkage。After opening, only the 0th parameter configuration takes effect。
    direction: PropTypes.string,//direction
    value: PropTypes.number.isRequired, //The value to scroll
    increment: PropTypes.number,    //Effective when openLot is turned on, how many turns the front roll does not move
    onAnimationEnd: PropTypes.func,  //Single digital animation execution end callback。
    onAnimationAllEnd: PropTypes.func, //All content execution end callback。
    title: PropTypes.string, //title
    symbol: PropTypes.oneOfType([ //Digitally signed symbols
        PropTypes.string,
        PropTypes.element
    ]),
    titleStyle: PropTypes.object, //title style
    openLot: PropTypes.bool, //Whether to turn on the number sign effect。
    contentStyle: PropTypes.object, //content style
    height: PropTypes.number, //Height, setting this height will affect the font size, the default is 30
    style: PropTypes.object, 
    duration: PropTypes.number, //Normal style execution time
}
export default Hijack(ScrollNumber);