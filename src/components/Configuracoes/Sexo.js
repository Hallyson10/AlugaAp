import React from 'react'
import { View, Text,TouchableOpacity,Dimensions } from 'react-native'
import styles from '../PerfilUsuario/styles'
const Sexo = (props) => {
    return (
        <View>
            <Text style={styles.subTexts}>Sexo</Text>
            <View style={[styles.containerOptions,{flexDirection:'row',alignItems:'center',
            width : Dimensions.get('window').width/1.1,
            backgroundColor:'#F2F2F2',
            marginBottom:8,borderColor:props.errorSexo ? "#E83D66" : '#F0FFF0'}]}>
            <TouchableOpacity 
            onPress={props.setSexoM}
            style={{ flex:1, backgroundColor: props.sexo === 'H' ? '#57CF87' : '#FFF'}}>
                <View style={styles.buttonText}>
                    <Text style={styles.textButton}>Homem</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={props.setSexoF}
                style={{flex:1,backgroundColor: props.sexo === 'M' ? '#57CF87' : '#FFF'}}>
                <View style={styles.buttonText}>
                    <Text style={styles.textButton}>Mulher</Text>
                </View>
                </TouchableOpacity>
            </View>
            {props.errorSexo ? <Text style={{color:"#E83D66",textAlign:'center'}}>Selecione uma opção.</Text> : null}
        </View>
    )
}

export default Sexo
