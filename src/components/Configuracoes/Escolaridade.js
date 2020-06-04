import React from 'react'
import { View, Text,Picker,PixelRatio,Dimensions } from 'react-native'
import styles from '../PerfilUsuario/styles'
const Escolaridade = (props) => {
    function picker(){
        return(
            <Picker
            selectedValue={props.escolaridade}
            style={{alignItems:'center',width:Dimensions.get('window').width/1.1,
            height:Dimensions.get('window').height/12,}}
            onValueChange={(itemValue, itemIndex) => props.setEscolaridade(itemValue)}
            >
                <Picker.Item label="Outros" value="Outros" />
                <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" />
                <Picker.Item label="Ensino Médio" value="Ensino Médio" />
                <Picker.Item label="Ensino Superior" value="Ensino Superior" />
                <Picker.Item label="Pós-graduada(o)" value="Pós-graduada(o)" />
            </Picker>
        )
    }
    return (
        <View style={{marginTop:20}}>
           <Text style={styles.subTexts}>Escolaridade</Text>
            <View style={[styles.containerOptions,{width:Dimensions.get('window').width/1.1,backgroundColor:'#FFF'}]}>
                {picker()}
            </View>
        </View>
    )
}

export default Escolaridade
