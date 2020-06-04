import React from 'react'
import { View, Text,StyleSheet,Dimensions,PixelRatio } from 'react-native'
import styles from './styles'
const Informacoes = (props) => {
    return (
        <View style={Styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Escolaridade</Text>
                   <Text style={styles.subTexts}>{props.escolaridade}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Data Nascimento</Text>
                <Text style={styles.subTexts}>{props.dataNascimento.dia}/{props.dataNascimento.mes}/{props.dataNascimento.ano}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Cidade Natal</Text>
                <Text style={styles.subTexts}>{props.cidadeNatal}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Sexo</Text>
               <Text style={styles.subTexts}>{props.sexo === 'H' ? 'Homem' : 'Mulher'}</Text>
            </View>
        </View>
        
    )
}

export default Informacoes
const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
    container : {
        height:Dimensions.get('window').height / 3.1,
        width:width-36,//,
        borderWidth:1,
        borderColor:'#F0FFF0',
        backgroundColor:'#F2F2F2',
        borderRadius:14,
        padding : 10,
        justifyContent: 'center',
    }
})