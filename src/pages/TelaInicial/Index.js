import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Image,StatusBar,ScrollView,View } from 'react-native'
import { Body,ViewS,Dimensions,Text,Subtitle } from './styled';
// import {Defs, Svg, Path,SvgFromUri,SvgXml } from 'react-native-svg'
// import  SvgUri  from 'react-native-svg-uri'
import { Logout } from '../../redux/ducks/Auth'
import { desativaModalEmailEnviado, EnviarEmailVerification,desativaModalVerificaEmail } from '../../redux/ducks/Profile'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import ImageSvg from '../../images/back4.svg'
import ModalSendEmail from '../../components/Confirmacoes/SendEmail'
import ModalEmailEnviado from '../../components/Confirmacoes/ConfirmarEmail'
const TelaInicial = (props) => {
  const dispatch = useDispatch();
  const emailVerificado = useSelector(state => state.profile.emailVerified);
  const emailEnviado = useSelector(state => state.profile.emailEnviado);
  
  return (
      <Body>
      <StatusBar hidden />
      <Image style={{height:'30%',width:'46%',position:'absolute',top:-10,left:-14,zIndex:2}} source={require('../../images/log.png')}/>
          <View style={{flex:1}}>
          <ImageSvg width={1800} height={380} />
          </View>
          <ViewS>
          <Subtitle>Compartilhamento de moradia e aluguel de imóveis</Subtitle>
            <ButtonNext onPress={()=>{props.navigation.navigate('FormName')}}  title='Quero ser colega'/>
            <Text onPress={()=>{props.navigation.navigate('Login')}}>Já sou colega</Text>
          </ViewS>
          <ModalEmailEnviado visible={emailEnviado} onPress={()=>dispatch(desativaModalEmailEnviado())} />
          <ModalSendEmail visible={emailVerificado} 
          onPress={()=>{
            dispatch(EnviarEmailVerification())
            dispatch(Logout());
            }} 
          back={()=>{
            dispatch(Logout());
            dispatch(desativaModalVerificaEmail())
            }} 
          />

      </Body>
  )
}

export default TelaInicial;