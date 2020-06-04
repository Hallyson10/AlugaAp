import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
const ButtonInputSearch = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
                 <View style={{width:90,height:40,alignItems:'flex-end',justifyContent:'center',alignItems:'flex-end'}}>
                     {props.text ? <Text style={{color:'#07000F',textAlign:'center'}}>{props.text} </Text> : props.icon ? <Icon size={22} name={props.icon} color='#07000F'/> : null}
                     
                 </View>
         </TouchableOpacity>
    )
}

export default ButtonInputSearch
