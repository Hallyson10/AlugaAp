import React from 'react';
import { View, TouchableOpacity,Text,Dimensions,PixelRatio } from 'react-native';

// import { Container } from './styles';

export default function RegisterUsers(props) {
    const fontSize = PixelRatio.get() * 12;
   
  return (
    <TouchableOpacity 
    onPress={props.onPressReenv}
    disabled={props.clique !== true && props.time === 0 ? false : true } >
    <View style={{
        height:Dimensions.get('window').height / 8,
        width : Dimensions.get('window').width /1,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: props.time === 0 ? '#B8E5CA':'#F0FFF0',
        padding:6,
        borderTopWidth:1,
        borderTopColor : '#57CF87'
        }}>
        <View style={{flex:3,borderRightWidth:1,borderRightColor:'#57CF87'}}>
        <Text style={{fontSize,fontWeight:'bold',color:'#003228'}}>Reenviar código</Text>
        <Text style={{color:"#003228"}}>Você pode reenviar seu código de verificação em instantes,caso queira.</Text>
        </View>
        <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          }}>
                <Text style={{fontSize,fontWeight:'bold'}}>0:{props.time}</Text>
        </View>
    </View>
    </TouchableOpacity>
  );
}
