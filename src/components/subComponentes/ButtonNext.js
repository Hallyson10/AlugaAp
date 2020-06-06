import React from 'react'
import { View, Text, TouchableOpacity ,Dimensions,ActivityIndicator } from 'react-native'

function ButtonNext(props){
    return (
        <TouchableOpacity 
        disabled={props.disabled}
        onPress={props.onPress}
        style={{
        backgroundColor:'#57CF87',
        height:50,
        width:Dimensions.get('window').width / 1.1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        marginTop:20}}>
            {props.disabled ?  <ActivityIndicator size="small" color="#051E0B" /> : <Text style={{fontSize:18,fontWeight:'900',color:"#FFF"}}>{props.title}</Text>}
           
        </TouchableOpacity>
    )
}

export default ButtonNext
