import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import InformacoesBasicas from './InformacoesBasicas'
import Privacidade from './Privacidade'
import RedesSociais from '../PerfilUsuario/RedesSociais'
const index = (props) => {
    return (
        <View style={{flex:1,backgroundColor:'#f2f2f2'}}>
            <InformacoesBasicas 
            valueNome={props.valueNome}
            onChangeTextUsername={(nome)=>props.onChangeTextUsername(nome)}
            onEndEditingNome={props.onEndEditingNome}
            valueCidade={props.valueCidade}
            onChangeTextCidade={(text)=>props.onChangeTextCidade(text)}
            onEndEditingCidade={props.onEndEditingCidade}
            escolaridade={props.escolaridade}
            setEscolaridade={(item)=>props.setEscolaridade(item)}
            dataNascimento={props.dataNascimento}
            setData={(data)=>props.setData(data)}
            setIdade={(idade)=>props.setIdade(idade)}
            sexo={props.sexo}
            setSexoF={props.setSexoF}
            setSexoM={props.setSexoM}
            />
            <Privacidade
            numberLivre={props.numberLivre}
            valueEmail={props.valueEmail}
            onChangeTextEmail={(text) => props.onChangeTextEmail(text)}
            valueSenha={props.valueSenha}
            onChangeTextSenha={(text)=>props.onChangeTextSenha(text)}
            secureTextEntry={false}
            toogleSwitch={props.toogleSwitch}
            />
            <RedesSociais 
            isConfig={true}
            onChangeTextFacebook={(text) => props.onChangeTextFacebook(text)}
            linkFacebook={props.linkFacebook}
            onChangeTextInstagram={(text) => props.onChangeTextInstagram(text)}
            linkInstagram={props.linkInstagram}
            />
            <TouchableOpacity onPress={props.sair}>
            <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
                <Text>Sair</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(index)
