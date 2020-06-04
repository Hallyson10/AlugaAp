import React from 'react';
import { View ,TouchableOpacity,Dimensions,PixelRatio,Text} from 'react-native';
import { Props } from 'react-native-image-pan-zoom/built/image-zoom/image-zoom.type';

// import { Container } from './styles';

export default function configuracao_post(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
    <View style={{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor : "#F0FFF0",
        paddingLeft:4,
        backgroundColor:'#FFF',
        alignItems: 'center',
        width : Dimensions.get('window').width / 1,
        height : Dimensions.get('window').height / 12,}}>
        <Text>{props.title}</Text>
        <Text>Ir</Text>
        </View>
        </TouchableOpacity>
  );
}
