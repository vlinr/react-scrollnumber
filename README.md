# statisticnumber

 A digital scrolling component based on React. Contains the ordinary one-time scrolling effect, the linkage scrolling effect and the shaking effect.
 
### Effect

The realization of statistics, let the numbers roll up.

### Look

![image](https://github.com/vlinr/statisticnumber/blob/master/readme/scroll.gif)

### Install

npm install --save-dev statisticnumber

### Configuration

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
 
 ### Example
 
 <StatisticNumber  
    numAnimationConfig={animParams}  
    linkage={true}    
    direction={'left'}   
    value={282204626}   
    title='LeftToRightLinkage'  
    titleStyle={{ textAlign: 'center' }}  
    openLot={true}  
    style={{  
        marginRight: '10%',  
        marginBottom:'10%'  
    }}  
    contentStyle={{  
        color:'#7329d4'  
    }}  
/>  
