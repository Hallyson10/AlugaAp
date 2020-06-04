import React from 'react'
import { View, Text, TouchableOpacity,Dimensions,PixelRatio } from 'react-native'

const ButtomConversar = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={{
            height:Dimensions.get('window').height/13,
            width:Dimensions.get('window').width/2.8,
            backgroundColor : '#57CF87',
            marginTop:4,
            borderRadius:12,
            alignItems:'center',
            justifyContent:'center',
            padding:2}} >
                <Text style={{fontSize : PixelRatio.get() * 10,color : "#FFF",fontWeight:'bold'}}>
                    Conversar
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtomConversar
