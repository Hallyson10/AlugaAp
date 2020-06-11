import React from 'react';
import { View,TouchableOpacity,Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image'
const {width , height} = Dimensions.get('window');

const subComponentes = (props) => {
  return (
    <FastImage
    style={{ width: width/1, 
    alignItems:'center',
    justifyContent:'center',
    height: width/1.1,
    
}}
    source={{
        uri: props.uri,
        headers: { Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.cover}
    >
</FastImage>
  )
}

export default subComponentes;