import React from 'react';
import { View,Text,Dimensions,PixelRatio } from 'react-native';
import styles from './styles';
import ButtonOption from '../../components/subComponentes/ButtomOption'
const { height } = Dimensions.get('window');
const width = Dimensions.get('window').width/2.6;
const sizeText = PixelRatio.get();
const Informacoes = (props) => {
  return (
    <>
    <View style={{backgroundColor:'#FFF',height:height/1.6,maxHeight:height/1.6,marginTop:14}}>
    <Text style={styles.textPrincipais}>Informações extras</Text>
    <View style={{flex:1,justifyContent:'center'}}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
    <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.geladeira ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.geladeira ? 'Geladeira' : ''} />
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.ceramica ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.ceramica ? 'Cerâmica' : ''} />
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.tetoForrado ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.tetoForrado ? 'Forrado' : ''} />
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.animais ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.animais ? 'Aceita animais' : ''} />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.fogao ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.fogao ? 'Fogao' : ''} />
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.garagemM ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.garagemM ? 'Garagem moto' : ''} />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.garagemC ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.garagemC ? 'Garagem carro' : ''} />
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.wifi ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.wifi ? 'Wifi' : ''} />
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.agua ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.agua ? 'Água' : ''} />
        <ButtonOption 
        activeOpacity={1}
        ativo={true}
        width={width} height={42}
        backgroundColor={props.comodides.energia ?'#A1E5BC' :'#F0FFF0'}
        title={props.comodides.energia ? 'Energia' : ''} />
        </View>
    </View>
    </View>
    </>
  )
}

export default Informacoes;