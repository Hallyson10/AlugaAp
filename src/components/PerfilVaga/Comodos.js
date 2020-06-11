import React from 'react';
import { View,Text,StyleSheet,Dimensions,PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconA from 'react-native-vector-icons/MaterialCommunityIcons'
import IconB from 'react-native-vector-icons/AntDesign'


const { width, height } = Dimensions.get('window');
const sizeText = PixelRatio.get();
const Icones = (props)=>(
    <View>
    <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color : '#838B84',fontSize : sizeText * 10,fontWeight:'bold',marginRight:8}}>{props.qtd}</Text>
        <Icon name={props.name} size={22} color='#838B84' style={{shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5}} />
    </View>
        <Text style={{color : '#838B84',fontSize : sizeText * 10}}>{props.title}</Text>
    </View>
)
const IconesM = (props)=>(
    <View style={{marginLeft:36,marginTop:-8}}>
    <View style={{flexDirection:'row',alignItems:'center',marginLeft:16}}>
        <Text style={{color : '#838B84',fontSize : sizeText * 10,fontWeight:'bold',marginRight:8}}>{props.qtd}</Text>
        <IconA name={props.name} size={30} color='#838B84' style={{shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5}}
         />
    </View>
        <Text style={{color : '#838B84',fontSize : sizeText * 10}}>{props.title}</Text>
    </View>
)
const IconesB = (props)=>(
  <View style={{marginLeft:36}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
      <Text style={{color : '#838B84',fontSize : sizeText * 10,fontWeight:'bold',marginRight:8}}>{props.qtd}</Text>
      <IconB name={props.name} size={22} color='#838B84' style={{shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5}}
       />
  </View>
      <Text style={{color : '#838B84',fontSize : sizeText * 10}}>{props.title}</Text>
  </View>
)
const PerfilVaga = (props) => {
  return (
    <View style={{height:!props.completa ? height/4 : height/6,justifyContent:'center',marginTop:10,paddingRight:10,paddingLeft:10}}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginBottom:12}}>
    <Icones qtd={props.qtdQuartos} name='bed' title='Quartos' />
    <Icones qtd={props.qtdBanheiros} name='bath' title='Banheiros' />
    <Icones qtd={props.qtdSuites} name='bed' title='Suítes'/>
    </View>
    {!props.completa ? <View style={{flexDirection:'row',marginBottom:10,alignItems:'center',paddingLeft:22}}>
    <Icones qtd={props.qtdMorando} name='user-friends' title='Morando'/>
    {
    props.preferencia === 'F' ? <IconesM name='human-female' title='Preferência'/> : 
    props.preferencia === 'H' ?<IconesM name='human-male' title='Preferência'/> :null
    }
    <IconesB name='key' title='Vagas' qtd={props.qtdVagas} />
    </View> : null}
    </View>
  )
}
const styles = StyleSheet.create({
    icons : {
        margin:10
    }
})
export default PerfilVaga;