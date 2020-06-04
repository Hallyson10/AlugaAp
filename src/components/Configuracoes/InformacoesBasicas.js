import React from 'react'
import { View, Text ,StyleSheet ,TextInput,Dimensions} from 'react-native'
import InputRegister from '../RegisterUsers/InputRegister'
import styles from '../PerfilUsuario/styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Idade } from '../../ControllersView/Controller'
import InputConfig from './InputConfig'
import DatePicker from './DatePicker'
import Sexo from './Sexo'
import Escolaridade from './Escolaridade'
const InformacoesBasicas = (props) => {
    return (
        <View style={{flex:1}}>
            <View style={{marginBottom:10,marginTop:20,width:Dimensions.get('window').width/1,paddingLeft:4}}>
            <Text style={styles.textCabecalhoContainer}>Informações Básicas</Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
            <InputConfig
            title='Nome'
            placeholder='Digite seu nome'
            value={props.valueNome}
            onChangeText={(nome)=>props.onChangeTextUsername(nome)}
            onEndEditing={props.onEndEditingNome}
            autoCapitalize="words"
            />
            <InputConfig
            title='Cidade'
            placeholder='cidade onde você nasceu'
            autoCapitalize="words"
            value={props.valueCidade}
            onChangeText={(text)=>props.onChangeTextCidade(text)}
            onEndEditing={props.onEndEditingCidade}
            />
            <Escolaridade 
            escolaridade={props.escolaridade}
            setEscolaridade={(item)=>props.setEscolaridade(item)}
            />
            <DatePicker
            dataNascimento={props.dataNascimento}
            setData={(data)=>props.setData(data)}
            setIdade={(idade)=>props.setIdade(idade)}
            />
            <Sexo 
            sexo={props.sexo}
            setSexoF={props.setSexoF}
            setSexoM={props.setSexoM}
            />
            </View>
        </View>
    )
}
const styled = StyleSheet.create({
    containerInput : {
        height : Dimensions.get('window').height / 12,
        width : Dimensions.get('window').width / 1.1,
        borderWidth: 1,
        backgroundColor:'#F2F2F2',
        paddingLeft:10
    }
})
export default InformacoesBasicas
