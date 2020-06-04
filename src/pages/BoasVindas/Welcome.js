import React from 'react'
import { View, TouchableOpacity,Text,StatusBar } from 'react-native'
import { Fundo } from '../../styles/fundos'
import { Botao } from '../../styles/buttons'
import { Texts } from '../../styles/texts'
export default Welcome = (props) => {
    return(
        <View style={ [Fundo.padrao,{backgroundColor:'#FFF'}] }>
             <StatusBar barStyle='dark-content' hidden />
            <TouchableOpacity style={Botao.button} onPress={()=>{props.navigation.navigate('Login')}}>
                <Text style={Texts.textButton}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Botao.button} onPress={()=>{props.navigation.navigate('FormName')}}>
                <Text style={Texts.textButton}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}