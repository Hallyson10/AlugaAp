import React from 'react'
import { View, Text, Dimensions,TouchableOpacity, PixelRatio } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconA from 'react-native-vector-icons/AntDesign'
import styled from '../../colors'

const PostInformationsBottom = (props) => {
    const sizeIcon = PixelRatio.get()*20
    const sizePrice = PixelRatio.get()*20
    function ViewMapa(){
        try {
            props.navigation.navigate('MapComponent',
            {long : props.long,lat : props.lat,rua: props.rua,numero : props.numero})
        } catch (error) {
            alert('ocorreu um erro inesperado!');
        }
    }
    return (
        <View 
        style={{height:Dimensions.get('window').height/6,
        backgroundColor:'#FFF',paddingLeft:14,paddingRight:12}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:12}}>
            <Text style={{fontSize:12,marginRight:4,fontWeight:'600',color:styled.menos_escura}}> 
            {props.completa ? "Quarto Completo" : "Quarto Compartilhado"} </Text>
            </View>
            <TouchableOpacity onPress={()=>ViewMapa()}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:16,fontWeight:'600',color:styled.menos_escura,opacity:0.9}}>{props.cidade}-{props.estado} </Text>
            <IconA color={styled.padrao} name='enviroment' size={14} />
            </View>
            </TouchableOpacity>
            <Text style={{fontSize:14,marginTop:-2,color:styled.menos_escura}}>{props.bairro}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{marginRight:6,color:styled.padrao}}>{props.countLikes} </Text>
                    <TouchableOpacity style={{marginRight:10}} onPress={props.like}>
                    <Icon solid={props.favorite ? false : true} 
                    color={styled.menos_escura}
                    selectionColor={styled.padrao} 
                    name='bookmark' size={sizeIcon} />
                    </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default PostInformationsBottom
//"#540EAD"