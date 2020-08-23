import React from 'react';
import { View,Text,Dimensions,PixelRatio } from 'react-native';
import styles from './styles'
const { width , height } = Dimensions.get('window');
const sizeText = PixelRatio.get();
const Descricao = (props) => {
  return (
    <>
    <View style={{backgroundColor:'#FFF',height:height/3.4,maxHeight:height/2.8}}>
    <Text style={styles.textPrincipais}>Descricao</Text>
    <View style={{backgroundColor:'#F2F2F2',borderRadius:8,flex:1,padding:10,marginLeft:18,marginRight:18}}>
        <Text style={{color : '#838B84',fontSize : sizeText * 10,textAlign:'justify'}}>{props.descricao}</Text>
    </View>
    </View>
    </>
  )
}

export default Descricao;