import React from 'react'
import { View, Text, TextInput,Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { TextInputMask } from 'react-native-masked-text'
import style from './Styles'
import {valorAluguel} from '../../../redux/ducks/Posts/CadastroPost'
const ValuePost = () => {
    const valorTotal = useSelector(state => state.post.post.valorTotal);
    const qtdPessoas = useSelector(state => state.post.post.qtdPessoasMorando);
    const dispatch = useDispatch();
    function valor(text){
        dispatch(valorAluguel(text));
    }
    return (
        <View style={
          [{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'},style.container]}>
            <View style={{marginRight:10}}>
            <Text style={style.topico}>+- Valor do aluguel</Text>
                <Text>(incl. água, energia, internet)</Text>
            </View>
                <View style={{
                flex:2,
                borderRadius:14,
                paddingLeft:6,
                borderColor:'#051E0B',
                borderWidth:0.6,
                flexDirection:'row',alignItems:'center'}}>
                    <Text>R$</Text>
                    <TextInput 
                    maxLength={4}
                    keyboardType='numeric'
                    style={{flex:1,fontWeight:'bold',fontSize:18}}
                    value={valorTotal}
                    onChangeText={(text)=> valor(text)}
                    />
                </View>
      
        </View>
    )
}

export default ValuePost
