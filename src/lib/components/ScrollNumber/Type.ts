import * as React from 'react';
export interface AnimationType {
    animationDuration?: number,
    animationTimingFunction?: string,
    animationFillMode?: string,
    animationIterationCount?: number,
    animationDelay?: number,
    value?: number,
    animationName?: string
}
export interface PropsType {
    value: number,
    onAnimationEnd?: Function,
    onAnimationAllEnd?: Function,
    title?: string,
    numAnimationConfig?: Array<AnimationType> | object,
    linkage?: boolean,
    direction?: string,
    increment?: number,
    symbol?: string | React.ReactNode,
    openLot?: boolean,
    titleStyle?: object,
    contentStyle?: object,
    height?: number,
    duration?: number,
    style?: object
}