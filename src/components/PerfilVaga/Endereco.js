import React from 'react';
import { View,Text,Dimensions,StyleSheet,PixelRatio } from 'react-native';
const { width , height } = Dimensions.get('window');
const sizeText = PixelRatio.get();
const PerfilVaga = (props) => {
  return (
    <>
    <View style={{height:height/4,paddingLeft:18}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Text style={[styles.textValue,{marginRight : 6,color : props.valorIndividual <= 500 ? '#5E10C0' : 
    props.valorIndividual > 500 && props.valorIndividual <= 1000 ?
      '#EBDD5E' : '#57CF87'
    }]} >R${props.valorIndividual}</Text>
    <Text style={{color : props.valorIndividual <= 500 ? '#5E10C0' : props.valorIndividual > 500 && props.valorIndividual <= 1000 ?
      '#EBDD5E' : '#57CF87',fontWeight:'bold'}}>p/pessoa</Text>
    </View>
    <Text style={[styles.textValue,{color : '#838B84',fontSize : sizeText * 10,marginTop:-8
    }]} >R${props.valorTotal}|total</Text>
    <Text style={styles.textCidade}>{props.cidadeVaga}-{props.estadoVaga}</Text>
    <Text style={styles.textRua}>{props.ruaVaga} - {props.numeroVaga}</Text>
    <Text style={styles.textBairro}>{props.bairroVaga}</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    textValue : {
      fontSize : sizeText * 20,
      color : '#051E0B',
      fontWeight : 'bold',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textCidade : {
      fontSize : sizeText * 12.8,
      color : '#838B84',
      fontWeight : '800',
      shadowColor: "#000",
    shadowOffset: {
	  width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    textRua : {
      fontSize : sizeText * 10,
      color : '#838B84',
      fontWeight : '600'
    },
    textBairro : {
      fontSize : sizeText * 10,
      color : '#838B84',
      fontWeight : '600'
    }
})
export default PerfilVaga;