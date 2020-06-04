import React,{ useState } from 'react';
import { View,StatusBar } from 'react-native';

import { Body } from './styled';
import Input from '../../components/RegisterUsers/InputRegister'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import Header from '../../components/subComponentes/Header'
const ConfiguracoesUsuario = (props) => {
  const [email,setEmail] = useState('');
  const [errorEmail,setError] = useState('');
  return (
      <Body>
       <StatusBar hidden={false} animated barStyle='light-content' backgroundColor='#57CF87' />
        <Header 
            backgroundColor='#57CF87'
           // back={()=>props.navigation.goBack()}
            />
      <Input
            autoCapitalize='none'
            error={errorEmail}
            placeholder='Ex: josesilva@gmail.com'
            errorName='Por favor,insira seu email válido.'
            autoCorrect={false}
            title='Qual seu email?'
            subTitle='Enviaremos uma mensagem de redefinição para seu e-mail'
            onChangeText={(email)=>setEmail(email)}
            value={email}
      />
      <ButtonNext
        title = 'Enviar email'
        onPress={()=>alert('enviando redefinição!')}
      />
      </Body>
  )
}

export default ConfiguracoesUsuario;