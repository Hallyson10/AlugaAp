import React from 'react'
import { View, Text } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import Input from '../../subComponentes/Input'
import style from './Styles'
import { setDescricao } from '../../../redux/ducks/Posts/CadastroPost'
const Descricao = () => {
    const descricao = useSelector(state => state.post.post.descricao);
    const dispatch = useDispatch();
    return (
        <>
        <View style={style.container}>
        <Input 
            title='DESCRIÇÃO'
            height={100} 
            width={'100%'}
            placeholder='Descrição'
            multiline={true}
            maxLength={180}
            value={descricao} 
            onChangeText={(descricao)=>dispatch(setDescricao(descricao))} 
            />
        </View>
        <View style={{width:'100%',alignItems:'flex-end',paddingRight:16,marginTop:8}}>
        <Text style={{textAlign:'right'}}>{descricao.length}/180</Text>
        </View>
        </>
    )
}

export default Descricao
