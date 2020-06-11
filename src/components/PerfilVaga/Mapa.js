import React from 'react';
import { View,Text,Dimensions,TouchableOpacity } from 'react-native';
const { width , height } = Dimensions.get('window');
import styles from './styles';
import MapaComponent from '../Mapa/index'
const Mapa = (props) => {
  return (
    <>
    <TouchableOpacity
    activeOpacity={1}
    style={{backgroundColor:'#FFF',height:height/2.2,flex:1}}>
    <Text style={styles.textPrincipais}>Localização</Text>
    <MapaComponent
        enabled={false}
    />
    </TouchableOpacity>
    </>
  )
}

export default Mapa;