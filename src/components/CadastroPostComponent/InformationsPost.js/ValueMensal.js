import React from 'react'
import { View, Text } from 'react-native'
import style from './Styles'
import { useSelector, useDispatch } from 'react-redux'
import {valorAluguel,valorIndividual} from '../../../redux/ducks/Posts/CadastroPost'

const ValueMensal = () => {
    const dispatch = useDispatch();
    //const valorIndividual = useSelector(state => state.post.post.valorIndividual);
    const valorTotal = useSelector(state => state.post.post.valorTotal);
    const qtdPessoas = useSelector(state => state.post.post.qtdPessoasMorando);
    const qtdVagas = useSelector(state => state.post.post.qtdVagas);

    const valorT = valorTotal !== '' ? parseInt(valorTotal) : 0;
    const qtdP = qtdPessoas !== '' ? parseInt(qtdPessoas) : 0;
    const qtdV = qtdVagas !== '' ? parseInt(qtdVagas) : 0;
    const valorAluguelIndividual = valorT / (qtdV + qtdP + 1);
    dispatch(valorIndividual(valorAluguelIndividual))
    return (
        <View style={
            [{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'},style.container]}>
            <View>
            <Text style={style.topico}>Valor mensal individual</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:16,color:'#051E0B'}}>+- R$ </Text>
            <Text style={{fontWeight:'bold',fontSize:16,color:'#051E0B'}}>{valorAluguelIndividual.toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default React.memo(ValueMensal)
