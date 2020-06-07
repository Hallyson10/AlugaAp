import React from 'react';
import { View,Dimensions,Text,TouchableOpacity,StyleSheet,PixelRatio } from 'react-native';
const {width , height} = Dimensions.get('window');
const sizeTextPricipal = PixelRatio.get()
const PostComponent = (props) => {
  return (
      <>
      {!props.anuciante && (!props.disponivel || !props.premiumAnunciante && !props.visitantePremmium) ? <TouchableOpacity
        activeOpacity={1}
      onPress={props.onPress}
       style={style.Touchable}>
            <View style={props.disponivel && !props.premiumAnunciante && !props.visitantePremmium ?
            style.buttonLiberar : !props.disponivel && props.anunciante ? style.buttonAlugada : !props.disponivel ?
            style.buttonAlugada : style.buttonCarregando
            }>
                    <Text style={[style.titlePrincipalButton,{fontWeight : !props.disponivel ? 'bold' : '900' }]}>{
                        (props.disponivel && !props.premiumAnunciante && !props.visitantePremmium && !props.anuciante) ?
                        'Liberar acesso' : !props.disponivel ? 'ALUGADO' : ''
                        }</Text>
                    {props.disponivel && !props.premiumAnunciante && !props.visitantePremmium ?
                     <Text style={style.titleSubButton}>Anúncio comum</Text> : null}
            </View>
            </TouchableOpacity> : 
            !props.disponivel && props.anuciante ? 
            <TouchableOpacity 
            activeOpacity={1}
            onPress={props.marcarComoDisponivel}
            style={style.Touchable}>
            <View style={style.buttonAnunciar}>
                    <Text style={[style.titlePrincipalButton,{fontWeight : !props.disponivel ? 'bold' : '900' }]}>Anunciar</Text>
            </View>
            </TouchableOpacity> : null
            }
        </>
  )
}

const style = StyleSheet.create({
    buttonLiberar : {
        height : height / 8.8,
        width : width /2,
        borderRadius:10,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : 'green',
        backgroundColor:'#13BA56'
    },
    buttonAlugada : {
        height : height / 9,
        width : width /2,
        alignItems : 'center',
        borderRadius:10,
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : '#FFF',
        backgroundColor : '#E83D66',
        opacity : 0.9,
        transform: [
            { rotate: '-10deg'},
      
          ],
    },
    buttonAnunciar : {
        height : height / 9,
        width : width /2,
        alignItems : 'center',
        borderRadius:10,
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : '#300666',
        backgroundColor : '#5E10C0',
        opacity : 0.9,
    },
    buttonCarregando : {
        backgroundColor:'transparent'
    },
    titlePrincipalButton : {
        fontSize : sizeTextPricipal * 12,
        color : '#FFF',
        fontWeight: '800'
    },
    titleSubButton : {
        fontSize : sizeTextPricipal * 10,
        color : '#ccc'
    },
    Touchable : {
                position:'absolute',
                top:'30%',
                left:0,
                right:0,
                alignItems:'center',
                justifyContent:'center',
                zIndex:2
    }
})
export default React.memo(PostComponent);