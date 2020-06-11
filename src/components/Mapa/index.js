import React from 'react';
import { View,StyleSheet } from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import styleMap from '../../styles/StyleMap'

// import { Container } from './styles';

const Mapa = (props) => {
  return (
    <MapView
    scrollEnabled= { props.enabled ? true : props.enabled}
    loadingEnabled={true}
    accessibilityViewIsModal
    showsCompass
    showsPointsOfInterest
    initialRegion={{
        latitude: props.lat ? props.lat : 0.0082,
        longitude: props.long ? props.long : 0.0082,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0081,
      }}
    region={{
        latitude: props.lat ? props.lat : 0.0082,
        longitude: props.long ? props.long : 0.0082,
        latitudeDelta: 0.0082,
        longitudeDelta: 0.0081
    }}
    customMapStyle={styleMap}
    style={styles.mapView}
    >
        <MapView.Marker
          coordinate={{latitude: props.lat ? props.lat : 0.0082,
                        longitude: props.long ? props.long : 0.0082,}}
          title={props.rua}
          description={`número ${props.numero}`}
        />
    </MapView>
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
export default Mapa;