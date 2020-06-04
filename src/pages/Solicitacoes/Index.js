import React,{ useState, useEffect , useCallback } from 'react';
import { View,SafeAreaView,Dimensions,Animated,StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Botao from '../../components/Solicitacoes/Botoes';
import Aceitas from './Aceitas'
import Pendente from './Pendente'

const { height , width } = Dimensions.get('window');

const telaOption = {
    ACEITAS : 'aceitas',
    PENDENTES : 'pendentes'
}

const Solicitacoes = (props) => {
    const [telaAtual, setTela] = useState(telaOption.PENDENTES);
    const translateX = new Animated.Value(0);
    const animatedEvent = Animated.event(
        [{
            nativeEvent : {
                translateX : translateX
            }
        }
        ],
        {
            useNativeDriver : true
        }
    )
    function onHandlerStateChange(event){

    }
  return (
      <SafeAreaView style={{flex:1,backgroundColor:'#FFF'}}>
       
        <View style={{flex:4,backgroundColor:'#FFF'}}>
     
            {telaAtual === telaOption.PENDENTES && <Pendente/>}
      
            {telaAtual === telaOption.ACEITAS && <Aceitas/>}
        </View>
        <View style={styles.viewBotoes}>
        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
        <Botao 
        onPress={()=>setTela(telaOption.PENDENTES)}
        title='Pendentes'
        backgroundColor='#E45E7E'
        atived={telaAtual === telaOption.PENDENTES}/>
        <Botao
        onPress={()=>setTela(telaOption.ACEITAS)}
        title='Liberadas'
        backgroundColor='#52C796'
        atived={telaAtual === telaOption.ACEITAS}
        />
        </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    viewBotoes : {
        position:'absolute',
        bottom : '2%',
        left: 0,
        right : 0,
        width:width,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default React.memo(Solicitacoes);