import React from 'react';
import { View ,Dimensions,TextInput,PixelRatio } from 'react-native';

// import { Container } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'
import BotoesPersonalidade from './BotoesPersonalidade'
import styles from './styles'
export default function Personalidade(props) {
  const fontSize = PixelRatio.get() * 13.2
  return (
    <View style={{
    height:Dimensions.get("window").height/5,
    width:styles.width,
    marginBottom:20,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
    }}>
      <TextInput
      maxLength={110}
      multiline
      returnKeyType={'go'}
      placeholder='Qual frase melhor define você?'
      placeholderTextColor='rgba(249,255, 240, 0.4)'
      style={{
      fontSize:fontSize,
      fontWeight:'bold',
      textAlign:'center',color:'#F9FFF0',opacity:0.8,flex:1}}
      value={props.valuePersonalidade}
      onChangeText={(text)=>props.onChangeTextP(text)}
      onEndEditing={props.onEndEditingP}
      />
    </View>
  );
}
