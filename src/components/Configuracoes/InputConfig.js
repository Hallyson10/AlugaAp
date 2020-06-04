import React from 'react'
import { View, Text,Dimensions,PixelRatio,TextInput } from 'react-native'
import styles from '../PerfilUsuario/styles'
const InputConfig = (props) => {
    return (
        <View style={{
            marginTop:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent: 'center',
            borderWidth:1,
            borderColor : "#F0FFF0",
            paddingLeft:4,
            backgroundColor:'#FFF',
            alignItems: 'center',
            width : Dimensions.get('window').width / 1,
            height : Dimensions.get('window').height / 12,}}>
                <View style={{height : Dimensions.get('window').height / 12,
                alignItems:'flex-start',
                justifyContent: 'center',
                flex:2}}>
                <Text style={[styles.texts,{fontWeight:'bold'}]}>{props.title}</Text>
                </View>
                <View style={{height : Dimensions.get('window').height / 12,
                flex:5}}>
                    <TextInput 
                    style={[styles.texts,{margin:0}]} 
                    onChangeText={(text)=>props.onChangeText(text)}
                    value={props.value}
                    placeholder={props.placeholder}
                    autoCapitalize={props.autoCapitalize}
                    autoCorrect={props.autoCorrect}
                    secureTextEntry={props.secureTextEntry}
                    onEndEditing={props.onEndEditing}
                    />
                </View>
            </View>
    )
}

export default InputConfig
