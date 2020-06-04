import React from 'react';
import { View,ScrollView } from 'react-native';

// import { Container } from './styles';
import BottomEditar from '../../components/configuracao_post/BottomEditar'
import Header from '../../components/subComponentes/Header'
function Index(props) {
    let params = props.navigation.state.params;
    return (
    <View style={{flex:1}}>
    <Header 
      backgroundColor="#57CF87"
      title='Editar publicação'
      back={()=>props.navigation.goBack()}
    />
    <BottomEditar title='Endereço' onPress={()=>props.navigation.navigate('ConfigEndereco',{post : params.post})} />
    <BottomEditar title='Fotos' onPress={()=>props.navigation.navigate('EditarFotosPost',{post : params.post})} />
    </View>
  );
}
export default React.memo(Index)