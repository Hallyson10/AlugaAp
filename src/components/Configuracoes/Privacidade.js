import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import Input from './InputConfig'
import NumeroLivre from './NumeroLivre'
import styles from '../PerfilUsuario/styles'
const Privacidade = (props) => {
    return (
        <View style={{flex:1}}>
            <View style={{marginBottom:10,marginTop:20,width:Dimensions.get('window').width/1,paddingLeft:4}}>
            <Text style={styles.textCabecalhoContainer}>Privacidade</Text>
            </View>
            <View style={{flex:1}}>
            <Input 
            title='Número'
            placeholder='Digite seu número'
            
            />
            <NumeroLivre 
            toogleSwitch={props.toogleSwitch}
            numberLivre = {props.numberLivre}
            />
            <Input 
            title='Email'
            placeholder='Digite seu email válido'
            style={[styles.texts,{margin:0}]} 
            onChangeText={(text) => props.onChangeTextEmail(text)}
            value={props.valueEmail}
            autoCapitalize={'none'}
            autoCorrect={false}
            />
            <Input 
            title='Senha'
            placeholder='Insira sua senha'
            value={props.valueSenha}
            onChangeText={(text)=>props.onChangeTextSenha(text)}
            secureTextEntry={true}
            />
            </View>
        </View>
    )
}

export default Privacidade
