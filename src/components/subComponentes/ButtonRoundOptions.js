import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ButtonRoundOptions = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{
            alignItems:'center',
            margin:4,
            height : 42, 
            width: 42, 
            borderRadius: 40,
            borderColor:'#7CE5A6',
            borderWidth: 0.8,
            justifyContent:'center'
            }}>
            {props.ativo ? 
            <View 
            style={{
            height : 21, 
            borderRadius: 40,
            backgroundColor:'#7CE5A6',
            width: 21
            }}
              /> : null}
        </View>
        <View style={{marginLeft:4}}>
        <Text>{props.preference}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}

export default ButtonRoundOptions
