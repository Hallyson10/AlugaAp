import React from 'react';
import { Dimensions,StatusBar } from 'react-native';
import Lottie from 'lottie-react-native'
import { TextVerification, Body,BodyView, SubTextVerification,TextOk,Button,BodyScroll } from './styles';
import sucessEmail from '../../animations/sucessEmail.json';
const { width , heigth } = Dimensions.get('window');
const Confirmacoes = (props) => { 
  return (
          <Body animationType='fade' visible={props.visible}>
          <StatusBar animated backgroundColor='#FFF' hidden />
            <BodyView>
            <Lottie source={sucessEmail} autoPlay style={{height:140,width:140}} loop />
              <TextVerification>E-mail de verificação enviado com sucesso!</TextVerification>
              <SubTextVerification>Acesse o link que enviamos para seu e-mail e confirme sua conta</SubTextVerification>
              <Button onPress={props.onPress}>
              <TextOk>Ok</TextOk>
              </Button>
            </BodyView>
          </Body>
  )
}

export default React.memo(Confirmacoes);