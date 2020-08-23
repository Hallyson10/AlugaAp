import React from 'react'
import { View, Text,Dimensions,TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
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
            <></>
        )

}

export default UserPostCabecalho


