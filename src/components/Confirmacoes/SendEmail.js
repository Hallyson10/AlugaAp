import React from 'react';
import { View,StatusBar } from 'react-native';
  
import { Body, BodyView, TextVerification,SubTextVerification,Button,TextButton,TextOk } from './styles';

const Confirmacoes = (props) => {
  
  return (
        <Body visible={props.visible} animationType='fade'>
        <StatusBar animated backgroundColor='#FFF' hidden />
        <BodyView>
        <TextVerification>Verifique seu e-mail</TextVerification>
        <SubTextVerification>Ei, já te enviamos um link de verificação para seu e-mail, 
        verifica lá pra nós e tenha acesso a essa e outras funcionalidades! </SubTextVerification>
        <Button onPress={props.back}>
              <TextOk>Sair</TextOk>
        </Button>
        <Button theme='transparent' onPress={props.onPress}>
                <TextButton>Reenviar link e Sair</TextButton>
        </Button>
        </BodyView>
        </Body>
  )
}

export default Confirmacoes;