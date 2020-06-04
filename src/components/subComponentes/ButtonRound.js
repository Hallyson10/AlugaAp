import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ButtonRound = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={{
            alignItems:'center',
            margin:4,
            height : 46, 
            width: 46, 
            borderRadius: 40,
            backgroundColor:'#7CE5A6',
            justifyContent:'center'
            }}>
            <Text style={{fontSize:30,color:'#051E0B'}}>{props.sinal}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default ButtonRound
