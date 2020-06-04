import React from 'react'
import { View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
const BotaoAround = (props) => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
             style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'}}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Icon name={props.name} size={props.size} color={props.color} />
                </View>
        </TouchableOpacity>
            
    )
}

export default BotaoAround
