import React,{useState} from 'react';
import { View, Text,TouchableOpacity,Dimensions,TextInput,PixelRatio,KeyboardAvoidingView,Platform  } from 'react-native';
import ButtonOption from '../subComponentes/ButtomOption';
import ButtonNext from '../subComponentes/ButtonNext'
import ModalConfirm from '../subComponentes/ModalConfirmation';
import { TextInputMask } from 'react-native-masked-text';
const fonteSizeMaior = PixelRatio.get() * 11.4;

const PhoneNumber = (props) => {
    return (
        <View style={{flex:1}}>
            <KeyboardAvoidingView 
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{flex:1,alignItems:'center',justifyContent:'space-between'}}
            >
            <View style={{flex:1,backgroundColor:'#FFF',alignItems:'center'}}>
                <View style={{
                height:Dimensions.get('window').height/4,
                backgroundColor:'#FFF',
                width:Dimensions.get('window').width/1,
                paddingLeft:14
                }}>
                    <Text 
                    style={{
                        textAlign:'left',
                        fontSize:fonteSizeMaior+2,
                        fontWeight:'bold',
                        color:'#051E0B'
                        }}>Informe seu número de telefone para contato
                    </Text>
                    <Text 
                    style={{
                        textAlign:'left',
                        color:'#051E0B'
                        }}>(Este número será usado para receber o código de verificação).</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:Dimensions.get('window').width/5,
                        height:Dimensions.get('window').height/10,
                        padding:6,
                        borderWidth:1,
                        borderColor:"#F0FFF0",
                        backgroundColor:'#F2F2F2',
                        marginRight:8,
                        }}>
                        <Text style={{
                            fontSize:fonteSizeMaior,
                            color:'#051E0B',
                            fontWeight:'bold'}}>+55</Text>
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width/1.6,
                        height:Dimensions.get('window').height/10,
                        borderBottomWidth:1,
                        borderColor:"#F0FFF0",
                        backgroundColor:'#F2F2F2',
                        paddingLeft:6,
                        justifyContent:'center'}}>
                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        placeholder='Número'
                        style={{fontSize:fonteSizeMaior,fontWeight:'bold'}}
                        value={props.phone}
                        onChangeText={text => props.setPhone(text)}
                        ref={(ref) => phoneField = ref}
                        />
                    </View>
                </View>
                <Text style={{margin: 6,color:'#051E0B'}}>(Digite um número de telefone válido).</Text>
                <View style={{flex:1,alignItems:'center'}}>
            <ButtonNext 
            onPress={props.function}
            title='Confirmar'
             />
             </View>
            </View>
            <ModalConfirm
            title={props.phone}
            show={props.showModal}
            Confirm={props.enviarSms}
            Cancel={props.Cancel}
            onDismiss={props.onDismiss}
            />
            </KeyboardAvoidingView>
        </View>
    )
}

export default PhoneNumber
