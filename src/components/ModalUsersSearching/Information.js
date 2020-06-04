import React from 'react'
import { View, Text, Dimensions,PixelRatio } from 'react-native'

const Information = (props) => {
    const compartilhada = 'Vaga compartilhada'
    const completa = 'Imóvel completo'
    const fonteSize = PixelRatio.get()*10
    const fonteSizeMaior = PixelRatio.get()*11.4
    return (
        <View style={{
            width:Dimensions.get('window').width/1.2,
            height:Dimensions.get('window').height/4.4,
            backgroundColor:'#FFF',
            padding:4,
            marginBottom:8,
            borderRadius:12
             }}>
                 <View style={{flex:1,backgroundColor:'#FFF'}}>
                
                 <Text style={{textAlign:'justify',  fontSize: fonteSize}} >
                     Estou em busca de um{props.tipoBuscaCompartilhada ? 'a': ''} </Text>
                 <Text style={{
                     backgroundColor:'#A1E5BC',
                     fontSize: fonteSizeMaior,
                     borderRadius : 10,
                     alignSelf:'auto',
                     marginBottom:4,
                     padding:2,
                     paddingLeft:6,
                     textAlign:'auto',
                    fontWeight:'bold',
                    color:'#FFF'
                 }}>{props.tipoBuscaCompartilhada ? compartilhada : completa }</Text>
                 <Text style={{
                textAlign:'auto',
                alignSelf:'auto',
                borderRadius : 10,
                fontWeight:'bold',
                padding:2,
                paddingLeft:6,
                marginBottom:2,
                backgroundColor:'#A1E5BC',
                fontSize: fonteSizeMaior,
                color:'#FFF'}}>
                      em {props.citySearching}
                </Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:fonteSize,textAlign:'justify'}}>preferência no bairro </Text>
                <Text style={{
                    fontSize: fonteSizeMaior,
                    backgroundColor:'#A1E5BC',
                    padding:2,
                    color:'#FFF',
                    fontWeight:'bold',
                    borderRadius:10}}>{props.bairro}</Text>
                </View>
                 </View>

        </View>
    )
}

export default React.memo(Information)
