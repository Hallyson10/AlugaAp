import React from 'react'
import {View,Dimensions,TouchableOpacity} from 'react-native'
const { width,height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign'
import Photo from '../../components/ModalUsersSearching/Photo'
import Personalidade from './Personalidade'
import BotaoAround from './BotaoAround'
import styled from '../../colors'

function PerfilFrente(props){
    return(
        <View style={{
            height:Dimensions.get('window').height / 1.8,
            backgroundColor:styled.principal,
            width:width-36,//
            marginBottom:6,
            borderRadius:10,
            marginHorizontal:18//
            }}>
        <View style={{
            justifyContent:'flex-end',
            flexDirection:'row',
            //width:styles.width,
            paddingTop:12,
            paddingRight:12
            }}>
            <TouchableOpacity
            onPress={props.openConfig}
            activeOpacity={0.8}
            accessibilityActions
            style={{height:Dimensions.get('window').height/14,width:Dimensions.get('window').width/8,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
            <Icon name='setting' size={28} color='#051E0B' />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',}}>
            <View style={{flex:1}}>
            {props.editFoto ? <BotaoAround 
            onPress={props.onPressRecuse}
            name='closecircle' size={38} color="#E83D66"
            /> : null}
            </View>
        
            <Photo
            onPress={props.onPress}
            isPerfil={props.isPerfil}
            photo={props.photo}
            username = {props.username}
            idade = {props.idade}
            />
        
            <View style={{flex:1}}>
            {props.editFoto ? <BotaoAround onPress={props.onPressAceite}
            name='checkcircle' size={38} color="#048035"
            /> :null}
            </View>
            
        </View>
        <Personalidade
        valuePersonalidade={props.valuePersonalidade}
        onChangeTextP={props.onChangeTextP}
        onEndEditingP={props.onEndEditingP}
        />
        </View>
    )
}
export default React.memo(PerfilFrente)