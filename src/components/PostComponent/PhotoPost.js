import React from 'react';
import { View,TouchableOpacity,Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image'
const {width , height} = Dimensions.get('window');
const PostComponent = (props) => {
  return (
    <>
        <TouchableOpacity 
        activeOpacity={1}
        onPress={props.toPost}
        >
        <View style={{backgroundColor:props.disponivel && !props.premiumAnunciante && !props.visitantePremmium ||
            !props.disponivel ? 'black' : "#F2F2F2"}}>
        <FastImage
            style={{ width: width/1, 
            alignItems:'center',
            justifyContent:'center',
            height: width/1.1,
            opacity: props.anuciante && !props.disponivel ? 0.4 : props.anuciante && props.disponivel ? 1 : props.disponivel && !props.premiumAnunciante && !props.visitantePremmium ? 0.2 :
            !props.disponivel ? 0.1 : 1
        }}
            source={{
                uri: props.uri,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            >
        </FastImage>
        </View>
        </TouchableOpacity>          
        </>
  )
}

export default React.memo(PostComponent);