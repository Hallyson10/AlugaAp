import React from 'react'
import { View, Text , Dimensions, PixelRatio,Clipboard, TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-simple-toast'
const RedesSociais = (props) => {
    async function copiarText(text){
        await Clipboard.setString(text)
        Toast.show('copiado')
    }
    return (
        <View style={{
            height:Dimensions.get('window').height/4,
            padding:10,
            width:styles.width
            }}>
            <Text style={styles.texts}
            >Redes Sociais</Text>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                <Icon name='instagram' size={24} />
                <Text style={[styles.subTexts,{marginRight:8,marginLeft:4}]}>Instagram</Text>
                {props.isConfig ?
                 <TextInput
                 placeholder={props.linkInstagram} 
                 style={{borderBottomWidth:0.1}}
                 value={props.linkInstagram}
                 onChangeText={(text)=>props.onChangeTextInstagram(text)}
                 /> : 
                <TouchableOpacity onPress={props.onPressI} onLongPress={()=>copiarText(props.linkInstagram)} style={{flex:1}}>
                <Text>{props.linkInstagram}</Text>
                </TouchableOpacity>
                }
                </View>
                <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                <Icon name='facebook-square' size={24} />
                <Text style={[styles.subTexts,{marginRight:8,marginLeft:4}]}>Facebook</Text>
                {props.isConfig ?
                <TextInput 
                placeholder={props.linkFacebook} 
                value={props.linkFacebook}
                onChangeText={(text)=>props.onChangeTextFacebook(text)}
                /> 
                : 
                <TouchableOpacity onPress={props.onPressF} onLongPress={()=>copiarText(props.linkFacebook)} style={{flex:1}}>
                <Text>{props.linkFacebook}</Text>
                </TouchableOpacity>
                }
                </View>
            </View>
        </View>
    )
}

export default RedesSociais
