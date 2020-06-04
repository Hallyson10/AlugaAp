import React from 'react'
import {View} from 'react-native'
import CabecalhoInteressados from '../components/subComponentes/CabecalhoInteressados'
 const InteressadosPostComponent = (props) => {
        return (
            <View style={{flex:1}}>
                <CabecalhoInteressados 
                onPress={props.onPress}
                time={props.item.date}
                title='Mensagem'
                titleInformation='Marcou interesse '
                username={props.item.user.username}
                image={props.item.user.fotosPerfil.uri}
                userId={props.userId} />
            </View>
        )
}

export default React.memo(InteressadosPostComponent);