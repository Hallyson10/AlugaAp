import React from 'react';
import { View, StyleSheet ,Dimensions,TouchableOpacity,Text} from 'react-native';

// import { Container } from './styles';
import styles from './styles'
export default function Publicados(props) {
  return (
    <View style={Styles.container}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('MeusPosts')}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Minhas publicações</Text>
                   <Text style={styles.subTexts}> ir </Text>
            </View>
    </TouchableOpacity>
    <TouchableOpacity>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.texts}>Minhas buscas</Text>
                   <Text style={styles.subTexts}> ir </Text>
            </View>
    </TouchableOpacity>
    </View>
  );
}
const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
    container : {
        height:Dimensions.get('window').height / 6.1,
        width:width-36,//,
        borderWidth:1,
        borderColor:'#F0FFF0',
        backgroundColor:'#F2F2F2',
        borderRadius:14,
        padding : 10,
        justifyContent: 'center',
        marginTop:6,
    }
})