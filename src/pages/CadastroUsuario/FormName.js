import React,{useRef,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    View,
     Text,
      SafeAreaView,
      StatusBar, 
      PixelRatio,
      Dimensions,
      KeyboardAvoidingView,
      Platform,
    ScrollView
    } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { setUsername, setEmail } from '../../redux/ducks/Register'
import InputRegister from '../../components/RegisterUsers/InputRegister'
import Header from '../../components/subComponentes/Header'
import Button from '../../components/subComponentes/ButtomOption'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import { verifyFormName, verifyFormEmail } from '../../ControllersView/Controller'

function FormName(props){
    let username = useSelector(state => state.register.user.username);
    let email = useSelector(state => state.register.user.email);
    let [errorEmail,setErrorEmail] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const dispatch = useDispatch();
    const fonteSizeMaior = PixelRatio.get()*14
    let prox = useRef(null)
      function setInputName(text){
        if(verifyFormName(text)){
          dispatch(setUsername(text))
          setErrorUsername(false);
        }else{
          dispatch(setUsername(text))
          setErrorUsername(true);
        }
      }
      function setInputEmail(text){
          if(verifyFormEmail(text)){
            dispatch(setEmail(text))
            setErrorEmail(false);
          }else if(!verifyFormEmail(text)){
            dispatch(setEmail(text))
            setErrorEmail(true);
          }
      }
    function prosseguir(){
      if(verifyFormEmail(email) && verifyFormName(username)){
        props.navigation.navigate('FormSenha');
      }
      else if(!verifyFormName(username) && !verifyFormEmail(email)){
        setErrorUsername(true);
        setErrorEmail(true);
      }
      else if(!verifyFormName(username)){
        setErrorUsername(true);
      }
      else if(!verifyFormEmail(email)){
        setErrorEmail(true);
      }
    } 
    return (
        <LinearGradient 
        colors={['#FFF',"#FFF"]}
        style={{flex:1}}
        >
        <StatusBar hidden={false} animated barStyle='light-content' backgroundColor='#57CF87' />
        <Header 
            backgroundColor='#57CF87'
            back={()=>props.navigation.goBack()}
            />
            <KeyboardAvoidingView 
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{flex:1,alignItems:'center'}}
            >
            <ScrollView style={{flex:1,paddingTop:20}}>
            <SafeAreaView  style={{height:Dimensions.get('window').height/1,alignItems:'center',marginBottom:20}}>
                <View style={{alignItems:'center',marginBottom:20}}>
                 <Button
                 backgroundColor='#57CF87'
                 ativo
                 height={Dimensions.get('window').height/14}
                 width={Dimensions.get('window').width /2.2}
                 title='Já sou colega'
                 function={()=>props.navigation.navigate('Login')}
                />
                <Text style={{color:"#ccc",fontWeight:'bold'}}>ou</Text>
                </View>
                <View style={{width : Dimensions.get('window').width / 1.1}}>
                <Text style={{fontSize:fonteSizeMaior,color:'#57CF87',fontWeight:'bold',textAlign:'right',marginRight:2}}>Estamos te esperando.</Text>
                <Text style={{fontSize:fonteSizeMaior,color:'#57CF87',fontWeight:'bold',textAlign:'right',marginRight:2}}>Torne-se nosso colega!</Text>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <InputRegister
            autoCapitalize='words'
            placeholder='Ex: José Silva'
            autoCorrect={false}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              prox.current.focus()
            }}
            error={errorUsername}
            errorName='Digite pelo menos nome e sobrenome'
            title='Qual seu nome?'
            autoFocus={true}
            onChangeText={(text)=>setInputName(text)}
            value={username}
            />

            <InputRegister 
            autoCapitalize='none'
            error={errorEmail}
            placeholder='Ex: josesilva@gmail.com'
            errorName='Por favor,insira seu email válido.'
            ref={prox}
            autoCorrect={false}
            title='Qual seu email?'
            subTitle='para confirmar sua conta, será lhe enviado um email de verificação.'
            onChangeText={(email)=>setInputEmail(email)}
            value={email}
            />
            </View>
            <View style={{
                height:Dimensions.get('window').height/5,
                alignItems:'center',}}>
            <ButtonNext 
            title='Próximo'
            onPress={()=>prosseguir()} />
            </View>
        </SafeAreaView>
        </ScrollView>
        </KeyboardAvoidingView>
        
        </LinearGradient>
    )
}

export default FormName
