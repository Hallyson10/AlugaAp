import React,{useState} from 'react'
import { View, KeyboardAvoidingView,Platform, StatusBar } from 'react-native'
import { useSelector , useDispatch } from 'react-redux'
import { setSenha } from '../../redux/ducks/Register'
import InputRegister from '../../components/RegisterUsers/InputRegister'
import Header from '../../components/subComponentes/Header'
import ButtonNext from '../../components/subComponentes/ButtonNext'
const FormSenha = (props) => {
    const dispatch = useDispatch();
    let senha = useSelector(state => state.register.user.password);
    let [secureTextEntry,setsecureTextEntry] = useState(true);
    let [errorSenha,setErrorSenha] = useState(false);
    function setInputSenha(text){
        if(text.length >= 6){
            dispatch(setSenha(text));
            setErrorSenha(false);
        }else{
            dispatch(setSenha(text));
            setErrorSenha(true);
        }
    }
    function prosseguir(){
        if(senha.length >= 6){
            props.navigation.navigate('AdicionarFotosPerfil');
        }else{
            setErrorSenha(true);
        }
    }
    function mostraSenha(){
        secureTextEntry ? setsecureTextEntry(false) : setsecureTextEntry(true);
    }
    return (
        <View style={{flex:1}}>
            <StatusBar barStyle='light-content' backgroundColor='#57CF87' />
            <Header 
            backgroundColor='#57CF87'
            back={()=>props.navigation.goBack()}
            />
            <View style={{flex:1,alignItems:'center',paddingTop:40}}>
            <KeyboardAvoidingView 
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{flex:1,alignItems:'center'}}>
            <InputRegister 
            senhaView={senha !== '' ? true : false}
            onPressMostrar={mostraSenha}
            secureTextEntry={secureTextEntry}
            autoCorrect={false}
            error={errorSenha}
            errorName='Digite no mínimo 6 caracteres'
            title='Digite sua melhor senha'
            subTitle='Escolha uma senha que você não esqueça nem querendo.'
            autoFocus={true}
            onChangeText={(text)=>setInputSenha(text)}
            value={senha}
            />
            <View>
                <ButtonNext
                title='Próximo'
                onPress={()=>prosseguir()}
                />
            </View>
            </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default FormSenha
