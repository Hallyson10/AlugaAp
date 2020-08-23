import React,{ Component } from 'react'
import { View, Text, ImageBackground,Image, FlatList, Dimensions,TouchableOpacity,Animated,PixelRatio} from 'react-native'
import EnviarMensage from '../subComponentes/EnviarMessage'


class PostPhotos extends Component{
   
    state = {
        images : [],
        message : false,
        selectedIndex : 0,
    }
    
     setSelectedIndex = event => {
            const viewSize = event.nativeEvent.layoutMeasurement.width;
            const contentOffset = event.nativeEvent.contentOffset.x;
            const selectedIndex = Math.floor(contentOffset / viewSize);
            this.setState({ selectedIndex });
     }

    render(){
    return (
        <></>
    )
    }
}

export default PostPhotos
