import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
const EnviarMessage = (props) => {
    const [sendMessage,setSendMensage] = useState(false);

    function enviarMensagem(){
        //setSendMensage(true);
        props.EnviarMensage();
    }
    return (
        <>
            <TouchableOpacity activeOpacity={2} onPress={()=> enviarMensagem()}>
        <View style={{
            height:38,
            backgroundColor:sendMessage  ?  "#F0E478" : 'rgba(87, 207, 135, 0.9)',
            justifyContent:'center',
            paddingLeft:12,
            paddingRight:12
            }}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    {
                        sendMessage ? <Text style={{color:'#000'}}>Solicitação Enviada</Text> : 
                        <Text style={{color:'#FFF'}}>Enviar Mensagem</Text>
                    }
                    
                    <Icon color='#FFF' name='angle-right' size={20}/>
                </View>
        </View>
        </TouchableOpacity>
        </>
    )
}

export default EnviarMessage
