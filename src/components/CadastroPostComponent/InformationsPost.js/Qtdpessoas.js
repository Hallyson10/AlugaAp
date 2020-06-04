import React from 'react'
import { View, Text } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import ButtonRound from '../../subComponentes/ButtonRound'
import {incrementQtdPessoas,decrementQtdPessoas} from '../../../redux/ducks/Posts/CadastroPost'
import style from './Styles'

const Qtdpessoas = () => {
    const qtdPessoasMorando = useSelector(state => state.post.post.qtdPessoasMorando);
    const dispatch = useDispatch();
    return (
        <View style={
            [{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'},style.container]}>
            <View style={{flex:1}}>
            <Text style={style.topico}>Quantas pessoas já moram com você?</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <ButtonRound onPress={()=>dispatch(decrementQtdPessoas())} sinal='-'/>
            <Text style={{margin:4,fontSize:20}}>{qtdPessoasMorando}</Text>
            <ButtonRound onPress={()=>dispatch(incrementQtdPessoas())} sinal='+'/>
            </View>
        </View>
    )
}

export default Qtdpessoas
