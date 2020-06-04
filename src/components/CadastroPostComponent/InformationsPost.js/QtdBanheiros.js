import React from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ButtonRound from '../../subComponentes/ButtonRound'
import style from './Styles'
import { incrementQtdBanheiros,decrementQtdBanheiros } from '../../../redux/ducks/Posts/CadastroPost'

const QtdBanheiros = () => {
    const qtdBanheiros = useSelector(state => state.post.post.qtdBanheiros);
    const dispatch = useDispatch();
    return (
        <View style={
        [{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'},style.container]
        }>
            <View>
            <Text style={style.topico}>Banheiros</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <ButtonRound onPress={()=>dispatch(decrementQtdBanheiros())} sinal='-'/>
                 <Text style={{margin:4,fontSize:20}}>{qtdBanheiros}</Text>
            <ButtonRound onPress={()=>dispatch(incrementQtdBanheiros())} sinal='+'/>
            </View>
        </View>
    )
}

export default QtdBanheiros
