import React from 'react';
import { View, TouchableOpacity,Text,Dimensions,StyleSheet } from 'react-native';

const { height , width } = Dimensions.get('window');
const Solicitacoes = (props) => {
  return (
      <TouchableOpacity 
        onPress={props.onPress}
        style={[styles.touchBotao,{backgroundColor : props.atived ? props.backgroundColor : '#F2F2F2',
        borderColor:props.atived ? props.backgroundColor: '#57CF87',borderWidth : props.atived ? 0 : 1.2}]}
        >
          <Text style={{color:props.atived ? '#FFF' : '#051E0B',fontWeight:'bold',fontSize:14}}>{props.title}</Text>
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    touchBotao : {
        height:height/12,
        width: width/2.4,
        backgroundColor:'#57CF87',
        borderRadius:28,
        alignItems:'center',
        justifyContent:'center',
        margin:8
    }
})
export default Solicitacoes;