import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ButtonRound from '../../subComponentes/ButtonRound';
import style from './Styles';
import {incrementQtdVagas,decrementQtdVagas} from '../../../redux/ducks/Posts/CadastroPost';
const QtdVagas = () => {
    const qtdVagas = useSelector(state => state.post.post.qtdVagas);
    const dispatch = useDispatch();
    return (
        <View style={
            [{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'},style.container]}>
            <View>
            <Text style={style.topico}>Vagas disponíveis</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <ButtonRound onPress={()=>dispatch(decrementQtdVagas())} sinal='-'/>
            <Text style={{margin:4,fontSize:20}}>{qtdVagas}</Text>
            <ButtonRound onPress={()=>dispatch(incrementQtdVagas())} sinal='+'/>
            </View>
        </View>
    )
}

export default QtdVagas
