import * as React from 'react';
import { PropsType } from './Type';
const { Component } = React;
const Hijack:Function = (WrappedComponent: Function) => {
    return class extends Component<PropsType> {
        constructor(props: PropsType) {
            super(props);
        }
        render() {
            let props: PropsType = {
                ...this.props,
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
                style: this.props.style || {},
            }
            return <WrappedComponent {...props} />
        }
    }
}
export default Hijack;