import React, { Component } from 'react'
import ScrollNumber from '../lib';
const Example = () => {
    const animParams = [
        {
            animationDuration: 10,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationIterationCount: 1,
            animationDelay: 0,
            value: 0
        },
        {
            animationDuration: 8,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationIterationCount: 1,
            animationDelay: 0,
            value: 7
        },
        {
            animationDuration: 5,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationIterationCount: 1,
            animationDelay: 0,
            value: 6
        }
    ];
    return (
        <div style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '2em'
        }}>
            {/***Right To Left Linkage Style****/}
            <ScrollNumber
                numAnimationConfig={
                    {
                        animationDuration: 1000
                    }
                }
                linkage={true}
                direction={'right'}
                value={282204626}
                title='RightToLeftLinkage'
                titleStyle={{ textAlign: 'center' }}
                openLot={true}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#f35'
                }}
            />
            {/***Left To Right Linkage Style****/}
            <ScrollNumber
                numAnimationConfig={animParams}
                linkage={true}
                direction={'left'}
                value={282204626}
                title='LeftToRightLinkage'
                titleStyle={{ textAlign: 'center' }}
                openLot={true}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#7329d4'
                }}
            />
            {/***Left To Right Lot Style****/}
            <ScrollNumber
                // numAnimationConfig={}
                direction={'left'}
                value={282204626}
                increment={1}
                title='LeftToRightLot'
                titleStyle={{ textAlign: 'center' }}
                openLot={true}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#efc80a'
                }}
            />
            {/***Right To Left Lot Style****/}
            <ScrollNumber
                // numAnimationConfig={}
                direction={'right'}
                value={282204626}
                increment={1}
                title='RightToLeftLot'
                titleStyle={{ textAlign: 'center' }}
                openLot={true}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#ef0ad3'
                }}
            />
            {/***Normal Style****/}
            <ScrollNumber
                value={282204626}
                duration={5}
                onAnimationEnd={() => { console.log('End of execution') }}
                onAnimationAllEnd={() => { console.log('All execution ends') }}
                title='Normal'
                titleStyle={{ textAlign: 'center' }}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#0a90ef'
                }}
            />
            {/***Symbol Scrolling Style****/}
            <ScrollNumber
                value={282204626}
                symbol={
                    <span>*</span>
                }
                onAnimationEnd={() => { console.log('End of execution') }}
                onAnimationAllEnd={() => { console.log('All execution ends') }}
                title='SymbolScrolling'
                titleStyle={{ textAlign: 'center' }}
                style={{
                    marginRight: '10%',
                    marginBottom: '10%'
                }}
                contentStyle={{
                    color: '#2db52b'
                }}
                duration={10}
            />
        </div>
    )
}

export default Example;