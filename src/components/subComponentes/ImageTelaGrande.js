import React,{useState,useEffect} from 'react'
import { View, Text , Dimensions,Image, FlatList,ImageBackground,StatusBar,Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import Header from '../subComponentes/Header'
import ImageZoom from 'react-native-image-pan-zoom';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const ImageTelaGrande = (props) => {
    const [selectedIndex,setSelectedIndexS] = useState(0);
    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);
        setSelectedIndexS( selectedIndex );
    }
    try {
        const images = props.navigation.state.params.images
        const index = props.navigation.state.params.index
        useEffect(()=>{
            setSelectedIndexS(index);
        },[])
        const y = new Animated.Value(0);
        const onScroll = Animated.event([{ nativeEvent : { contentOffset : { y } } } ],{ useNativeDriver : true})
    return (
        <View style={{flex:1,backgroundColor:'#F0FFF0'}}>
            <Header back={()=>props.navigation.goBack()} backgroundColor='#F0FFF0' title='' color='black' />
            <StatusBar barStyle='dark-content' backgroundColor='#F0FFF0' showHideTransition='fade' animated />
            <View style={{
                position : 'absolute',
                top:64,
                left:'80%',
                zIndex:1,
                display:'flex',
                height:24,
                borderRadius : 10,
                width:50,
                backgroundColor:'rgba(52, 52, 52, 0.8)',
                alignItems:'center',
                justifyContent:'center'}}>
                {<Text style={{color:'#fff'}} >{selectedIndex+1}/{images.length} </Text>}
                </View>
            <AnimatedFlatList
            scrollEventThrottle={16}
             bounces={false} 
            horizontal
            key={item=>item.value}
            keyExtractor={item=>item.value}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={images}
            onMomentumScrollEnd={this.setSelectedIndex}
            initialScrollIndex={index}
            renderItem={({item})=>(
                <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={Dimensions.get('window').height}
                       
                       >
                 <FastImage
                    style={{ 
                    width:Dimensions.get('window').width, 
                    height:Dimensions.get('window').height,
                    position : 'absolute'
                }}
                    source={{
                        uri: item.sucess,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                 /> 
                </ImageZoom>
                
            )}
                    {...{onScroll}}
            />
        </View>
    )
        
    } catch (error) {
        
    }
}

export default React.memo(ImageTelaGrande);
//rgba(52, 52, 52, 0.8)