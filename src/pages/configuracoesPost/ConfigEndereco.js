import React from 'react';
import { View,ScrollView } from 'react-native';

// import { Container } from './styles';
import ConfigEnderecoComponent from '../../components/configuracao_post/ConfigEndereco'
import Header from '../../components/subComponentes/Header'
export default function ConfigEndereco(props) {
  let params = props.navigation.state.params;
  return (
    <View style={{flex:1}}>
     <Header 
      backgroundColor="#57CF87"
      title='Endereço'
      back={()=>props.navigation.goBack()}
    />
    <ScrollView>
    <ConfigEnderecoComponent
    post = {params.post}
    navigation={props.navigation}
    />
    </ScrollView>
    </View>
  );
}
