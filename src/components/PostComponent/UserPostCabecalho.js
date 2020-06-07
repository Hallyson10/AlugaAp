import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import styled from '../../colors'
import 'moment-timezone';
import 'moment/locale/pt-br';
moment.tz.setDefault('ISO');
moment.locale('pt-BR');
import styles from './styles'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const UserPostCabecalho = (props) => {
    renderImage = () => {
        try {
            return(
                <ShimmerPlaceHolder
          style={{height: Dimensions.get('window').height/5.8,
                width: Dimensions.get('window').width/3.6,borderRadius: 45}}
          autoRun={true}
          visible={props.user.fotosPerfil.uri !== ''}>
                <FastImage
                style={{ 
                width:40, 
                height:40,
                borderRadius : 20,
                backgroundColor:'#ccc',
                marginRight:4
             }}
                source={{
                    uri: props.user.fotosPerfil.uri ,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
        />
        </ShimmerPlaceHolder>
            )
        } catch (error) {
            return(
                    <View></View>
            )
        }
    }
        return (
            <View style={styles.cabecalho}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   {renderImage()}
                    <View>
                    <Text style={[styles.namesDestaque,{color:styled.padrao_escura,opacity:0.9}]}> 
                    {
                        !props.anuciante && (!props.disponivel || !props.premiumAnunciante && !props.visitantePremmium) ? 'Anunciante':
                        props.user.username.split(' ').slice(0, 2).join(' ')
                        
                    } </Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:-2,paddingLeft:4}}>
                    <Text style={[styles.subNames,{color:styled.padrao}]}> 
                    {props.completa ? "Imóvel Completo" : "Vaga Compartilhada"} 
                    </Text>
                    </View>
                    </View>
                    </View>
                    <View style={{paddingRight:4}}>
                        <Text style={[styles.sub,{color:styled.padrao,textAlign:'auto'}]}>{moment(props.data).fromNow()}</Text>
                    </View>
                    </View>
            </View>
        )

}

export default UserPostCabecalho


