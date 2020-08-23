import React from 'react'
import { View, Text, Dimensions,TouchableOpacity, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconA from 'react-native-vector-icons/AntDesign'
import styled from '../../colors'
const { width, height } = Dimensions.get('window');
const PostInformationsBottom = (props) => {
    function ViewMapa(){
        try {
            props.navigation.navigate('MapComponent',
            {long : props.long,lat : props.lat,rua: props.rua,numero : props.numero})
        } catch (error) {
            alert('ocorreu um erro inesperado!');
        }
    }
    return (
        <View>
            
        </View>
    )
}

export default PostInformationsBottom
//"#540EAD"