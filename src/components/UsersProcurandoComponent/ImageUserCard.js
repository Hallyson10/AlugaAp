import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

const ImageUserCard = (props) => {
    return (
        <View style={{
        backgroundColor:'#fff',
        height: Dimensions.get('window').height/4.6,
        borderTopRightRadius:14,
        borderTopLeftRadius:14,
        width: Dimensions.get('window').width/2.5}}>
          <FastImage
          style={{ 
            width: Dimensions.get('window').width/2.5,
            borderTopRightRadius:14,
            borderTopLeftRadius:14,
            height: Dimensions.get('window').height/4.6,
          backgroundColor:'#ccc',
       }}
          source={{
              uri: props.image ,
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          >
              <View style={{flex:1,justifyContent:'flex-end'}}>
                <View style={{
                backgroundColor:'rgba(124, 229, 166, 0.6)',
                padding:6,
                borderTopLeftRadius:14,
                borderTopRightRadius:14,
                justifyContent:'center',
                paddingLeft:10,
                height: Dimensions.get('window').height/19}}>
                <Text style={{fontSize:18,color:'#fff',textAlign:'center',fontWeight:'bold'}}>{props.username.split(' ').slice(0, 1).join(' ')},{props.idade} </Text>
                </View>
              </View>
          </FastImage>
      </View>
    )
}

export default ImageUserCard
