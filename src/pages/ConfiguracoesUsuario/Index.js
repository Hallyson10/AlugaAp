import React,{useState} from 'react'
import { View, Text,ScrollView,SafeAreaView,StatusBar ,BackHandler,Keyboard} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ConfigComponent from '../../components/Configuracoes/index'
import { Logout } from '../../redux/ducks/Auth'
import { verifyFormName } from '../../ControllersView/Controller'
import { verifyFormEmail } from '../../ControllersView/Controller'
import {
    setTabConfigDesativa,
    setTabConfigAtiva,
    setUsername,
    desfazConfig,
    setCidadeNatal,
    setEscolaridade,
    setDataNascimento,
    setSexo,
    setIdade,
    setEmail,
    setSenha,
    setLinkInstagram,
    setLinkFacebook,
    numberLivre,
    numberPrivado,
    AlterarInfBasicas
} from '../../redux/ducks/Configuracoes/EditarPerfil'
import Header from '../../components/subComponentes/Header'
import HeaderConfig from '../../components/subComponentes/HeaderConfig'
import Icon from 'react-native-vector-icons/AntDesign'
const Index = (props) => {
    const [errorUsername,setErrorName] = useState(false);
    const [errorEmail,setErrorEmail] = useState(false);
    const [errorSenha,setErrorSenha] = useState(false);
    const [errorIdade,setErrorIdade] = useState(false);
    const user = useSelector(state => state.profile.user);
    const userEdite = useSelector(state => state.editarperfil.user);
    const tabConfig = useSelector(state => state.editarperfil.tabConfig)
    const dispatch = useDispatch();
    const onBackPress = () => {
        if (!props.navigation.isFocused()) {
        // The screen is not focused, so don't do anything
        return false;
        }
        props.navigation.goBack(null);
        return true;
        };
    function cancelUpdate(){
        dispatch(desfazConfig(userEdite));
        dispatch(setTabConfigDesativa());
        Keyboard.dismiss()
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
       
    }
    function updateNumberLivre(){
        user.numberLivre ? dispatch(numberPrivado(user.userId)) : dispatch(numberLivre(user.userId))
    }
    function aceitarUpdate(){
        Keyboard.dismiss()
        if(verifica() && verifyFormName(user.username) && user.idade >= 17 && user.cidadeNatal !== '' && verifyFormEmail(user.email) && user.password.length >= 6){
            dispatch(AlterarInfBasicas(user));
            dispatch(setTabConfigDesativa());
        }else{
            dispatch(setTabConfigDesativa());
            alert('Preencha todos os dados corretamente')
            if(!verifyFormName(user.username)){
                setErrorName(true);
            }
            if(!verifyFormEmail(user.email)){
                setErrorEmail(true);
            }
            if(user.password.length < 6){
                setErrorSenha(true);
            }
            if(user.idade < 17){
                setErrorIdade(true);
            }
        }
    }
    function verifica(){
        if(user.username !== userEdite.username || user.idade !== userEdite.idade || user.cidadeNatal !== userEdite.cidadeNatal || user.escolaridade !== userEdite.escolaridade || user.sexo !== userEdite.sexo || user.email !== userEdite.email || user.password !== user.password || 
            user.linkFacebook !== userEdite.linkFacebook || user.linkInstagram !== userEdite.linkInstagram){
            return true;
        }
        return false;
    }

    function ativaTab(){
            dispatch(setTabConfigAtiva());   
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
    function SetEscolaridade(text){
        dispatch(setEscolaridade(text));
        ativaTab();
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle='dark-content' backgroundColor='#F9FFF0' />
            {!tabConfig ? <Header 
            title='Configurações'
            backgroundColor='#57CF87'
            back={()=>props.navigation.goBack()}
            /> : 
            <HeaderConfig  
            backgroundColor='#57CF87'
            IconLeft={<Icon name='close' size={28} />}
            IconRight={<Icon name='check' size={28} />}
            onPressLeft={cancelUpdate}
            onPressRight={aceitarUpdate}
            />
            }
        <ScrollView>
        <View style={{flex:1}}>
            <ConfigComponent 
            valueNome={user.username}
            onChangeTextUsername={(nome)=>{dispatch(setUsername(nome))
                setErrorName(false);
                ativaTab()
            }}
            valueCidade={user.cidadeNatal}
            onChangeTextCidade={(cidade)=>{dispatch(setCidadeNatal(cidade))
                ativaTab()
            }}
            escolaridade={user.escolaridade}
            setEscolaridade={(text)=>{SetEscolaridade(text)
                ativaTab()
            }}
            dataNascimento={user.dataNascimento}
            setData={(data)=>{dispatch(setDataNascimento(data))
                ativaTab()
                setErrorIdade(false);
            }}
            setIdade={(idade)=>{dispatch(setIdade(idade))
                ativaTab()
            }}
            sexo={user.sexo}
            setSexoF={()=>{dispatch(setSexo('M'))
            ativaTab()
            }}
            setSexoM={()=>{dispatch(setSexo('H'))
            ativaTab()
            }}
            //privacidade
            numberLivre = {user.numberLivre}
            toogleSwitch={updateNumberLivre}
            valueEmail = {user.email}
            onChangeTextEmail={(text) => {dispatch(setEmail(text))
                ativaTab()
                setErrorEmail(false);
            }}
            valueSenha = {user.password}
            onChangeTextSenha={(text) => {dispatch(setSenha(text))
                ativaTab()
                setErrorSenha(false);
            }}
            linkInstagram = {user.linkInstagram}
            onChangeTextInstagram = {(text) => {dispatch(setLinkInstagram(text))
            ativaTab()
            }}
            linkFacebook = {user.linkFacebook}
            onChangeTextFacebook = {(text) => {dispatch(setLinkFacebook(text))
                ativaTab()
            }}
            sair = {()=>dispatch(Logout())}
            
            />
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Index)
