import React,{useState} from 'react';
import { View ,StyleSheet,Text,Dimensions,Image} from 'react-native';

// import { Container } from './styles';
const { width , height } = Dimensions.get('window');

const PerfilVaga = (props) => {
    const sizeCircle = [
        {width : 74,height : 74}
        ,{width : 88,height : 88}
        ,{width : 65,height : 65},
        {width : 80,height : 80}
        ,{width : 70,height : 70}
        ,{width : 78,height : 78},
        {width : 62,height : 62}
        ,{width : 72,height : 72}
    ]
    const random = parseInt(Math.random() * (9 - 1) + 0);
  return (
    <View key={props.username} style={[styles.circle,{height : sizeCircle[random].height,width:sizeCircle[random].width}]}>
      <Image
        source={{uri:props.uri}}
        style={[{borderRadius : 180,height : sizeCircle[random].height,width:sizeCircle[random].width}]}
        resizeMode='cover'
      />
    </View>
  )
}

const styles = StyleSheet.create({
    circle : {
        borderRadius : 180,
        backgroundColor:'#ccc',
        margin : 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default PerfilVaga;