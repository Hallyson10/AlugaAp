import React,{ useEffect,useState } from 'react'
import { View, Text, TextInput,Dimensions,KeyboardAvoidingView,Platform,PixelRatio} from 'react-native'

import Button from '../subComponentes/ButtonNext'
import BottomReenviar from './BottomReenviarCod'
const fonteSizeMaior = PixelRatio.get() * 11.4;

const ConfirmarCodigo = (props) => {
    return (
        <View style={{flex:1}}>
            <KeyboardAvoidingView 
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{flex:1,alignItems:'center'}}
            >
            <View style={{flex:1,alignItems:'center'}}>
            <View style={{
                height:Dimensions.get('window').height/6,
                width:Dimensions.get('window').width/1,
                paddingLeft:14,
                marginBottom:40,
                }}>
                    <Text 
                    style={{
                        textAlign:'left',
                        fontSize:fonteSizeMaior+2,
                        fontWeight:'bold',
                        color:'#051E0B'
                        }}>Verificação de número
                    </Text>
                    <Text 
                    style={{
                        textAlign:'left',
                        color:'#051E0B'
                        }}>(A verificação é importante para manter seu contato atualizado).</Text>
                </View>
            <View style={{
                marginBottom:4,
                        width:Dimensions.get('window').width/1.6,
                        height:Dimensions.get('window').height/10,
                        borderBottomWidth:1,
                        borderColor:"#F0FFF0",
                        backgroundColor:'#F2F2F2',
                        paddingLeft:6,
                        justifyContent:'center'}}>
                            <TextInput
                            style={{
                                justifyContent:'space-between',
                                fontSize:20,
                                fontWeight:'bold',
                                textAlign:'center'
                                }}
                            value={props.codigo}
                            onChangeText={(text)=>props.setCodigo(text)}
                            />

        </View>
        <View style={{
            width:Dimensions.get('window').width/1.5,
            height:Dimensions.get('window').height /8,
            paddingVertical:10,
            alignItems:'center',
            }}>
                {
                    props.verificado === 'enviado' ? <Text>Ei,estamos te enviando um código de verificação por SMS,aguarde!!!
                    </Text>
                    :
                    props.verificado === 'pendente' ?
                    <Text style={{textAlign:'justify',fontWeight:'bold'}}>Já lhe enviamos um código. Por favor, verifique na sua caixa de SMS!</Text> : null
                }
        
        </View>
        <Button 
        onPress={props.verificarNumber}
        title='Verificar'
        disabled={props.disabled}
        />
        </View>
        <View style={{alignItems:'center'}}>
            <BottomReenviar 
            clique={props.clique}
            onPressReenv={props.onPressReenv}
            time={props.time}/>
        </View>
        </KeyboardAvoidingView>
        </View>
    )
}

export default ConfirmarCodigo
