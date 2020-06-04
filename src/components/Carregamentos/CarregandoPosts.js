import React from 'react'
import { View, Modal ,StatusBar } from 'react-native'
import Lottie from 'lottie-react-native'
const CarregandoPosts = (props) => {
    return (
        <View>
           <StatusBar barStyle='dark-content' backgroundColor='#F9FFF0' />
        <Modal 
        visible={props.visible}
        animationType='fade'
        transparent={false}
    >
        <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
            <View style={{
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:4,
            backgroundColor:'#F9FFF0',
            borderRadius : 10,
            height: 110,
            width: 120,}}>
            <Lottie source={props.carregamento} autoPlay />
            </View>
        </View>
        </Modal>
        </View>
    )
}

export default CarregandoPosts
