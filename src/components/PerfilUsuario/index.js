import React from 'react'
import { View, Text ,Dimensions ,TouchableOpacity,ScrollView } from 'react-native'
import Informacoes from './Informacoes'
import RedesSociais from './RedesSociais'
import styles from './styles'
import PerfilPersonalidade from './PerfilPersonalidade'
import PerfilFrente from './PerfilFrente'
import Publicados from './Publicados'
function index(props){
    return (
        <View style={{flex:1,alignItems:'center'}}>
            <ScrollView
            style={{width:'100%'}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            >
            <PerfilFrente 
            onPress={props.onPress}
            isPerfil={props.isPerfil}
            photo={props.photo}
            username = {props.username}
            idade = {props.idade}
            editFoto={props.editFoto}
            onPressAceite={props.onPressAceite}
            openConfig={props.openConfig}
            onPressRecuse={props.onPressRecuse}
            valuePersonalidade={props.valuePersonalidade}
            onChangeTextP={(text)=>props.onChangeTextP(text)}
            onEndEditingP={props.onEndEditingP}
            />
            <PerfilPersonalidade />
            </ScrollView>
            <Informacoes
            escolaridade={props.escolaridade}
            sexo={props.sexo}
            dataNascimento={props.dataNascimento}
            cidadeNatal={props.cidadeNatal}
            />
            <Publicados navigation={props.navigation}/>
            <RedesSociais
            linkInstagram={props.linkInstagram}
            linkFacebook={props.linkFacebook}
            onPressI={props.onPressI}
            onPressF={props.onPressF}
            />
            <View style={{marginBottom:20,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                <Text style={[{textAlign:'center'},styles.subTexts]}>Entrou em 12 de Abril</Text>
                <Text style={[{textAlign:'center'},styles.subTexts]}>0 Visualizações</Text>
            </View>
        </View>
    )
}

export default index
