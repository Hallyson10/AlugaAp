import React,{useEffect,useState} from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styled from '../../colors'

const QtdCurtiramPost = (props) => {
    return (
        <View style={{
        height:32,backgroundColor:'#fff',
        borderTopWidth:0.4,
        borderTopColor:'#ccc',
        justifyContent:'center',}}>
                <View style={{flexDirection:'row',alignItems:'center',paddingLeft:12}}>
                <Icon color={styled.padrao} name='users' size={14} />
               <Text style={{paddingLeft:6,color:styled.menos_escura}}>{props.countLikes} interessada(os) </Text>
               </View>
        </View>
    )
}

export default QtdCurtiramPost
