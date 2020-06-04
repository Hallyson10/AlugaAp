import React,{useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView,{ PROVIDER_GOOGLE, Callout } from 'react-native-maps'
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
                loadingEnabled={true}
                accessibilityViewIsModal
                showsCompass
                showsPointsOfInterest
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0082,
                    longitudeDelta: 0.0081,
                  }}
                region={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.0082,
                    longitudeDelta: 0.0081
                }}
                customMapStyle={styleMap}
                style={styles.mapView}
                >
                    <MapView.Marker
                      coordinate={{latitude: lat,longitude: long}}
                      title={rua}
                      description={`número ${numero}`}
                    />
                </MapView>
                
                </View>
            )

}

const styles = StyleSheet.create({
    mapView :{
        flex:1,
        left :0,
        top:0,
        bottom:0,
        right:0
        }
})