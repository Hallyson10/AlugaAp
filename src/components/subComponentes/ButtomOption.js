import React from 'react'
import { View, Text, TouchableOpacity, Dimensions,Platform } from 'react-native'

const ButtomOption = (props) => {
    return (
        <View style={{margin:6}}>
            <TouchableOpacity disabled={props.disabled} activeOpacity={0.8} style={props.ativo ? 
                [
                {   height:props.height,
                    borderRadius:12,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : '#A1E5BC',
                    alignItems:'center',
                    padding:6,
                    width:props.width,
                    justifyContent:'center',
                    }]
                :[{
                    backgroundColor:'white',
                    borderRadius:12,
                    borderWidth:1,
                    padding:2,
                    borderColor:'#57CF87',
                    alignItems:'center',
                    justifyContent:'center'},
                    {height:props.height,width:props.width}] } 
                onPress={props.function} >
                    <Text style={props.ativo ? {color:props.color ? props.color :'#FFF',fontSize:16,textAlign:'center',fontWeight:'bold'} : 
                    {color:'#57CF87',fontSize:16,textAlign:'center',fontWeight:'bold'
                }}> {props.title} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtomOption
