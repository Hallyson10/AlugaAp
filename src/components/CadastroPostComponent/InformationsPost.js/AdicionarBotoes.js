import React from 'react'
import { View, Text } from 'react-native'
import ButtonRound from '../../subComponentes/ButtonRound'
import style from './Styles'
const AdicionarBotoes = (props) => {
    return (
        <View style={
            [{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'},style.container]
            }>
                <View>
                <Text style={style.topico}>{props.title}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <ButtonRound onPress={props.decremento} sinal='-'/>
                    <Text style={{margin:4,fontSize:20}}>{props.qtd}</Text>
                <ButtonRound onPress={props.incremento} sinal='+'/>
                </View>
            </View>
    )
}

export default AdicionarBotoes
