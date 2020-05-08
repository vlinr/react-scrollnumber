import * as React from 'react';
import Prefix from './Prefix';
import Hijack from './Hijack';
import { PropsType, AnimationType } from './Type';
import './index.less';
const { Fragment } = React;
interface AnimationConfigType extends AnimationType {
    lastDuration?: number,
    haveRedundant?: boolean
}
const ScrollNumber = (props: PropsType): React.ReactNode => {
    const {
        numAnimationConfig, linkage, direction, value, increment,
        onAnimationEnd, onAnimationAllEnd, title, symbol, titleStyle,
        openLot, contentStyle, height, style, duration
    }: PropsType = props,
        defalutAnimation: AnimationType = { //Default parameter
            animationDuration: linkage ? 10 : 1,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationIterationCount: 1,
            animationDelay: 0
        }, valueArray = value.toString().split('');
    let executeLength: number = 0;
    function directionStyle(numAnimationConfig: Array<AnimationType> | object, number: number, index: number, valueArray: Array<string>, dir: string = 'left'): object {
        let numberItem: AnimationType = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {},
            count: number = 0, last: boolean = false, spike: number = 1;
        let animConfig: AnimationConfigType = {
            animationName: `number${10}`,
            animationDuration: numberItem?.animationDuration || defalutAnimation.animationDuration,
            animationTimingFunction: numberItem?.animationTimingFunction || defalutAnimation.animationTimingFunction,
            animationFillMode: numberItem?.animationFillMode || defalutAnimation.animationFillMode,
            animationIterationCount: numberItem?.animationIterationCount || defalutAnimation.animationIterationCount,
            animationDelay: numberItem?.animationDelay || defalutAnimation.animationDelay,
        }
        if (dir !== 'left') {
            for (let i: number = (index - 1); i >= 0; i--) {
                count += parseInt(valueArray[i]) * spike;
                spike *= 10;
            }
            last = index === 0 ? true : false;
        } else {
            let zeroIndex: number = checkZero(valueArray);
            if (zeroIndex >= index) {
                for (let i: number = index; i <= zeroIndex; i++) {
                    count += parseInt(valueArray[i]) * spike;
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
            let duration: number = animConfig.animationDuration / (count + 1);
            let lastDuration: number = duration / 10 * number;
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

    function checkZero(arr: Array<string>): number {
        for (let i: number = arr.length - 1; i >= 0; i--) {
            if (parseInt(arr[i]) != 0) return i;
        }
        return -1;
    }

    function lotNumber(numAnimationConfig: Array<AnimationType> | object, number: number, index: number, valueArray: Array<string>, dir: string = 'left', idleNum = 3): object {
        let numberItem: AnimationType = Array.isArray(numAnimationConfig) && numAnimationConfig.length > 0 ? numAnimationConfig[0] : numAnimationConfig || {};
        let animConfig: AnimationConfigType = {
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

    function findNumber(arr: Array<AnimationConfigType>, number: number): any {
        for (let i: number = 0; i < arr.length; ++i) {
            let item = arr[i];
            if (item.value == number) return item
        }
        return null;
    }

    function normalStyle(numAnimationConfig: Array<AnimationType>, duration: number, number: number): object {
        let numberItem: any = findNumber(numAnimationConfig, number);
        let animConfig: AnimationConfigType = {
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

    function animationExecuteEnd(config: AnimationConfigType, e: any): void {
        let target: any = e.target;
        if (config.haveRedundant) {
            config.animationName = `number${config.value}`;
            config.animationDuration = config.lastDuration;
            config.animationIterationCount = 1;
            let animConfig: any = createStyle(config, config.value);
            for (let key in animConfig) target.style[key] = animConfig[key];
            config.haveRedundant = false;
        } else {
            onAnimationEnd?.(config.value, e.target);
            executeLength++;
            if (executeLength === valueArray.length - 1) onAnimationAllEnd?.(true);
            // executeLength++ === valueArray.length - 1 ? onAnimationAllEnd?.(true) : '';
        }
    }

    function createStyle(animConfig: AnimationConfigType, number: number): object {
        let style: any = {};
        for (let i: number = 0; i < Prefix.length; ++i) {
            let item: string = Prefix[i];
            style[`${item}animationName`] = animConfig.animationName || `number${number}`;
            style[`${item}animationDuration`] = animConfig.animationDuration + 's';
            style[`${item}animationFillMode`] = animConfig.animationFillMode;
            style[`${item}animationIterationCount`] = animConfig.animationIterationCount;
            style[`${item}animationDelay`] = animConfig.animationDelay + 's';
            style[`${item}animationTimingFunction`] = animConfig.animationTimingFunction;
        }
        return style;
    }

    function numberList(item: number, index: number): React.ReactNode {
        let style: any = {};
        if (linkage) {
            style = directionStyle(numAnimationConfig, item, index, valueArray, direction);
        } else if (openLot) {
            style = lotNumber(numAnimationConfig, item, index, valueArray, direction, increment);
        } else {
            style = normalStyle(Array.isArray(numAnimationConfig) ? numAnimationConfig : [], duration, item);
        }
        return (
            <div className={`scrollNumer scroll${item}`} key={index}>
                <div className="number" onAnimationEnd={animationExecuteEnd.bind(this, style.config)} style={{ ...style.style }}>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item: number, index: number) => <span key={index}>{item}</span>)
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
                        valueArray.map((item: string, index: number) => numberList(parseInt(item), index))
                    }
                </div>
            </div>
        </Fragment>
    )
}
// ScrollNumber.propTypes = {
//     numAnimationConfig: PropTypes.oneOfType([  //Animation configuration parameters
//         PropTypes.array,
//         PropTypes.object
//     ]),
//     linkage: PropTypes.bool,//Whether to enable linkage。After opening, only the 0th parameter configuration takes effect。
//     direction: PropTypes.string,//direction
//     value: PropTypes.number.isRequired, //The value to scroll
//     increment: PropTypes.number,    //Effective when openLot is turned on, how many turns the front roll does not move
//     onAnimationEnd: PropTypes.func,  //Single digital animation execution end callback。
//     onAnimationAllEnd: PropTypes.func, //All content execution end callback。
//     title: PropTypes.string, //title
//     symbol: PropTypes.oneOfType([ //Digitally signed symbols
//         PropTypes.string,
//         PropTypes.element
//     ]),
//     titleStyle: PropTypes.object, //title style
//     openLot: PropTypes.bool, //Whether to turn on the number sign effect。
//     contentStyle: PropTypes.object, //content style
//     height: PropTypes.number, //Height, setting this height will affect the font size, the default is 30
//     style: PropTypes.object, 
//     duration: PropTypes.number, //Normal style execution time
// }
export default Hijack(ScrollNumber);