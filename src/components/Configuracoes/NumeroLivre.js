import React from 'react'
import { View, Text, Dimensions,PixelRatio,Switch } from 'react-native'
import styles from '../PerfilUsuario/styles'
const NumeroLivre = (props) => {
    return (
        <View style={{height:Dimensions.get('window').height/3.8,
        paddingHorizontal:4,marginBottom:20,marginTop:20,
        width:Dimensions.get('window').width/1}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{flex:5}}>
                    <Text style={styles.textCabecalhoContainer}>Contato Livre</Text>
                    <Text style={[styles.subTexts,{textAlign:'left',
                fontSize:PixelRatio.get()*10}]}>Caso ativado,qualquer pessoa poderá entrar em contato pelo seu número,instagram e facebook
                        sem necessitar solicitá-lo.
                    </Text>
                 </View>
                 <View style={{flex:2,alignItems:'center',justifyContent: 'center',}}>
                 <Switch
                    trackColor={{ false: "#767577", true: "#57CF87" }}
                    thumbColor={props.isEnabled ? "#051E0B" : "#F9FFF0"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={props.toogleSwitch}
                    value={props.numberLivre}
                />
                 </View>
            </View>
        </View>
    )
}

export default NumeroLivre
