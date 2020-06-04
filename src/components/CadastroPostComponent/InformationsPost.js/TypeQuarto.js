import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { View, Text,Dimensions } from 'react-native'
import ButtonOption from '../../subComponentes/ButtomOption'
import style from './Styles'
import { tipoVaga } from '../../../redux/ducks/Posts/CadastroPost'
const TypeQuarto = (props) => {
    const individual = useSelector(state => state.post.post.individual);
    const compartilhada = useSelector(state => state.post.post.compartilhada);
    const sala = useSelector(state => state.post.post.sala);
    const dispatch = useDispatch();
    return (
        <View style={[{
            height:120},style.container]
            }>
            <View >
            <Text style={[style.topico,style.topicosEspeciais]}>Tipo de Quarto</Text>
            </View>
        <View style={{flexDirection:'row',flex:1,justifyContent:'space-around'}}>
            <ButtonOption ativo={individual} function={()=>dispatch(tipoVaga('individual'))} title='Individual' height={50} width={Dimensions.get('window').width/3.6} />
            <ButtonOption function={()=>dispatch(tipoVaga('compartilhada'))} ativo={compartilhada} title='Compartilhado' height={50} width={Dimensions.get('window').width/2.4} />
            <ButtonOption function={()=>dispatch(tipoVaga('sala'))} ativo={sala} title='Sala' height={50} width={Dimensions.get('window').width/4.8} />
        </View>
        </View>
    )
}

export default TypeQuarto
