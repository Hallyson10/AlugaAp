import React from 'react';
import { View,Dimensions,TouchableOpacity } from 'react-native';

// import { Container } from './styles';
import FastImage from 'react-native-fast-image'
import ButtonOption from '../subComponentes/ButtomOption'
function EditarFotos(props) {
  return (
        <FastImage
        style={{
          height:Dimensions.get('window').height/1,
          marginBottom:2,marginTop:8,
          backgroundColor:'#F9FFF0',
          width:Dimensions.get('window').width/1}}
        source={{uri:props.uri,headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,}}
                        resizeMode={FastImage.resizeMode.contain}
        >
        <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
        <ButtonOption 
          title='Excluir'
          function={props.removeFoto}
          width = {Dimensions.get('window').width / 3}
          height={Dimensions.get('window').height / 12}
          backgroundColor='#E83D66'
          ativo
        />
        </View>

        </FastImage>

  );
}
export default React.memo(EditarFotos)