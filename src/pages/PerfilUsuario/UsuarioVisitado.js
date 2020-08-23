import React,{useEffect,useState} from 'react';
import { View, StyleSheet,Text,Dimensions,ScrollView,SafeAreaView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import PerfilVisitanteComponent from '../../components/PerfilUsuario/PerfilVisitante/index'
const { height , width } = Dimensions.get('window');
const PerfilUsuario = (props) => {
  const [usuario,setUsuario] = useState(null);
  useEffect(()=>{
      const user = props.navigation.state.params.user;
      //alert(JSON.stringify(user))
      setUsuario(user);
  },[])
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <TouchableOpacity 
        onPress={()=>props.navigation.goBack()}
        style={{height:height/8,paddingLeft:16,justifyContent:'center'}}>
        <Icon name='left' size={30} color='#051E0B' />
        </TouchableOpacity>
        <PerfilVisitanteComponent
            usuario={usuario !== null ? usuario : {fotosPerfil:{uri:'k'}}}
        />
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#FFF'
    }
})
export default PerfilUsuario;