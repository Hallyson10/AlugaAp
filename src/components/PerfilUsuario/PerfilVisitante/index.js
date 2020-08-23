import React from 'react';
import { View } from 'react-native';

import PerfilFrente from '../PerfilFrente';
import Informacoes from '../Informacoes';
import RedesSociais from '../RedesSociais';
const PerfilVisitante = (props) => {
  return (
      <View style={{flex:1,}}>
          <PerfilFrente
            isUsuario={true}
            onPress={props.onPress}
            photo={props.usuario.fotosPerfil.uri}
            username = {props.usuario.username}
            idade = {props.usuario.idade}
            valuePersonalidade={props.usuario.descricaoPessoal}
           
          />
          <Informacoes
            escolaridade={props.usuario.escolaridade}
            sexo={props.usuario.sexo}
            cidadeNatal={props.usuario.cidadeNatal}
            isUsuario={true}
          />
          <RedesSociais
            linkFacebook={props.usuario.linkFacebook}
            linkInstagram={props.usuario.linkInstagram}
          />
      </View>
  )
}

export default PerfilVisitante;