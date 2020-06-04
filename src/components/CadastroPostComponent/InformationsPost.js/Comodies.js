import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import ButtonOption from '../../subComponentes/ButtomOption'
import style from './Styles'
import { useSelector,useDispatch } from 'react-redux';
import {
  setGeladeira,setGaragemM,
  setGaragemC,setForrado,
  setFogao,setEnergia,setWifi,
  setCeramica,setAnimais,setAgua} from '../../../redux/ducks/Posts/CadastroPost'
export default function Comodies() {
    const width = Dimensions.get('window').width/2.6;
    const geladeira = useSelector(state=>state.post.post.comodides.geladeira);
    const fogao = useSelector(state=>state.post.post.comodides.fogao);
    const garagemM = useSelector(state=>state.post.post.comodides.garagemM);
    const garagemC = useSelector(state=>state.post.post.comodides.garagemC);
    const animais = useSelector(state=>state.post.post.comodides.animais);
    const agua = useSelector(state=>state.post.post.comodides.agua);
    const energia = useSelector(state=>state.post.post.comodides.energia);
    const ceramica = useSelector(state=>state.post.post.comodides.ceramica);
    const tetoForrado = useSelector(state => state.post.post.comodides.tetoForrado);
    const wifi = useSelector(state=>state.post.post.comodides.wifi);
    const dispatch = useDispatch();
  return (
      <View style={style.container}>
          <View>
            <Text style={[style.topico,style.topicosEspeciais]}>Comodies</Text>
        </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
        <View>
        <ButtonOption 
        function={()=>dispatch(setGeladeira())}
        ativo={geladeira}
        width={width} height={42}
        title='Geladeira' />
        <ButtonOption 
        function={()=>dispatch(setFogao())} 
        ativo={fogao}
        width={width} 
        height={42} 
        title='Fogão' />
        <ButtonOption 
        function={()=>dispatch(setGaragemM())} 
        ativo={garagemM}
        width={width} 
        height={42} 
        title='Garagem Moto' />
        <ButtonOption 
        function={()=>dispatch(setGaragemC())} 
        ativo={garagemC}
        width={width} 
        height={42} 
        title='Garagem Carro' 
        />
        <ButtonOption 
        function={()=>dispatch(setWifi())}
        ativo={wifi}
        width={width} 
        height={42} 
        title='Wifi' />
        </View>
        <View>
        <ButtonOption 
        function={()=>dispatch(setAnimais())}
         ativo={animais}
         width={width} 
         height={42} title='Aceita animais' />
        <ButtonOption
         function={()=>dispatch(setForrado())} 
         ativo={tetoForrado}
         width={width} 
         height={42} 
         title='Teto forrado' />
        <ButtonOption 
        function={()=>dispatch(setAgua())} 
        ativo={agua}
        width={width} 
        height={42} 
        title='Água' />
        <ButtonOption 
        function={()=>dispatch(setEnergia())}
        ativo={energia}
         width={width} 
         height={42} 
         title='Energia' />
         <ButtonOption 
        function={()=>dispatch(setCeramica())}
        ativo={ceramica}
        width={width} 
        height={42} 
        title='Cerâmica' />
        </View>
    </View>
    </View>
  );
}
