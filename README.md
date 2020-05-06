# react-scrollnumber

 A digital scrolling component based on React. Contains the ordinary one-time scrolling effect, the linkage scrolling effect and the shaking effect.
 
### Effect

The realization of statistics, let the numbers roll up.

### Look

![image](https://lh3.googleusercontent.com/z4RIxpD7SBvZGl6qyCqXXCpjCcufHgRqhNW2FE8SMc1_14oiQ12lSdJhn921Uo6MhqwmqlgVq-aMaeShLQGxauXXNZZe1K4lwZbiVDBLKU0a4AiLnRFrVQ8hP99YfFzy3kMIv6PLZAXN1AYgNc2MzHeN4jr7C0_pyNsRggkd-u-qNgtbhYBlSEuvS6FmIAeZBjEjwKa83gjS1qMuEw1a9IsrDpW2mAayZgwqouKpH7pfEcvVyQfXaUueXYRAWE35jQ0nlBc1jLNCvf3nzADQ3LJIkiXxj1t9c6eNPBI4bIZbG1ONIQiStd_kMghJUzIUU6gcciB5K1rY2BT4yJ7SOCHax7wxa_BvlOR3b2xdEERjqxIpDnR7my9lvzba7JAxbMGE6UTMxAXZ5HCZDPguiVPgGh9EXwX_n2bi3SNi-R8ZCfCdisUZzpNVHa-PPBsp-iGq3uaDxN0OsWjtyQ69l0l6WXwXbUHrl5LmzJ7Qaz14CfuD0wBvY1nZ5f0JkKjte421Fg90TccV8XxqS9LC5NtAJYv3Ek00IZ6TAm5ltoIbQw0s6f7rQ_v5mh0y_lTwlspNbEAQTJcNRV7y0xz4k4cUS0z6tItla5puxYTAub3QnK_jIXLHUM5fj5MWg1yzWFpTQqdqVlM20Zln2NGtHXZRu3u1BD7KonmeMJHfPQ7fngn3M4mY7ENo_C51=w241-h437-no)

### Install

```javascript
  npm install --save-dev react-scrollnumber
```
or
```javascript
  yarn add react-scrollnumber
```
### Operate Independently
```javascript
  npm install
```
```javascript
  npm run dev
```

### Npm Address
<a href="https://www.npmjs.com/package/react-scrollnumber/">react-scrollnumber</a>

### Configuration

 ```javascript
{  
   numAnimationConfig:Animation configuration parameters  
   linkage:Whether to enable linkage。After opening, only the 0th parameter configuration takes effect。  
   direction:direction  
   value:The value to scroll  
   increment:Effective when openLot is turned on, how many turns the front roll does not move  
   onAnimationEnd:Single digital animation execution end callback。  
   onAnimationAllEnd:All content execution end callback。  
   title:title  
   symbol:Digitally signed symbols  
   titleStyle:title style  
   openLot:Whether to turn on the number sign effect。  
   contentStyle:content style  
   height:Height, setting this height will affect the font size, the default is 30  
   style: style,   
   duration: Normal style execution time  
 }  
 ```
### Example

 ```javascript
import React, { Component } from 'react'
import ReactDom from 'react-dom';
import ScrollNumber from 'react-scrollnumber';
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

ReactDom.render(
    <Example />,
    document.getElementById('root')
);
```
 
