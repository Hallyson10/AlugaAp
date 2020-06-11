import React,{useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from './Mapa/index'
import styleMap from '../styles/StyleMap'
import Header from '../components/subComponentes/Header'
export default function MapComponent(props){
      
      //alert(JSON.stringify(rua))
      let long = props.navigation.getParam('long', '0.0');
      let lat = props.navigation.getParam('lat', '0.0');
      let rua = props.navigation.getParam('rua', 'Rua não encontrada');
      let numero = props.navigation.getParam('numero', '0');

            return (
                <View style={{flex:1}}>
                  <Header back={()=>props.navigation.goBack()} 
                  right={numero} 
                  title={`${rua.split(' ').slice(0, 3).join(' ')}...`} backgroundColor='#07000F'/>
                <MapView 
                lat = {lat}
                long = {long}
                numero={numero}
                rua={rua}
                />
                </View>
            )

}
