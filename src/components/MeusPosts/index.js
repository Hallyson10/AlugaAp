import React from 'react';
import { View,StyleSheet,Dimensions,TouchableOpacity,Text } from 'react-native';

// import { Container } from './styles';
import FastImage from 'react-native-fast-image'
const {width, height} = Dimensions.get('window');
import styles from './styles'
 function MeusPosts(props) {
  return (
      <TouchableOpacity activeOpacity={1} onPress={()=>alert('ok')}  >
    <View style={Styles.container}>
        <View style={{flex:1,flexDirection:'row',alignItems:"center"}}>
            <View style={{flex:2}}>
                <FastImage 
                style={{height:height / 3,width:width/2.2,
                minHeight : height / 3, minWidth: width/2.2}}
                source={{
                        uri: props.uri,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}>

                </FastImage>
            </View>
            <View style={{flex:2}}>
            <View style={{alignItems:'flex-end',paddingRight:5,margin:10,}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('ConfigPost',{post : props.item})}>
                <Text style={styles.textCabecalhoContainer}>Editar</Text>
            </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'flex-start'}}>
            <Text style={styles.subTexts}>{props.item.compartilhada ? 'Vaga Compartilhada' : 'Imóvel Completo' }</Text>
                    <Text style={styles.subTexts}>{props.item.endereco.cidade} {props.item.endereco.estado}</Text>
                    <Text style={styles.subTexts}>{props.item.endereco.rua}{props.item.endereco.numEndereco}</Text>
                    <Text style={styles.subTexts}>{props.item.endereco.bairro}</Text>
            </View>
            <TouchableOpacity>
            <View style={{alignItems:'center',paddingRight:5,backgroundColor:'rgba(87, 207, 135, 0.9)'}}>
                <Text style={styles.textCabecalhoContainer}>{props.item.disponivel ? "Disponível" : "Indisponível"}</Text>
            </View>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
    container : {
        height:Dimensions.get('window').height / 2.4,
        width:width/1,//,
        borderWidth:1,
        borderColor:'#F0FFF0',
        backgroundColor:'#F2F2F2',
        //justifyContent: 'center',
        marginTop:6
    }
})
export default React.memo(MeusPosts)