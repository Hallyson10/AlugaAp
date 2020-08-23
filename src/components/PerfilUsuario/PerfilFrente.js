import React,{useState,useEffect} from 'react'
import {View,Dimensions,TouchableOpacity} from 'react-native'
const { width,height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign'
import Photo from '../../components/ModalUsersSearching/Photo'
import Personalidade from './Personalidade'
import BotaoAround from './BotaoAround'
import styled from '../../colors'

const arrayColors = ['#E8D848',"#8630F2","#E4708C","#C699FF"];
const random = parseInt(Math.random() * (3 - 0) + 0);

function PerfilFrente(props){
    return(
        <View>
        </View>
    )
}
export default React.memo(PerfilFrente)