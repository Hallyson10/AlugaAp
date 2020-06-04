import React,{useState,useEffect,useCallback,useMemo} from 'react';
import { View ,KeyboardAvoidingView,StatusBar,Text,ImageBackground,Dimensions,PixelRatio,Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'

import { 
  setCep,
  setBairro,
  setCidade,
  setEstado,
  setNumEndereco,
  setRua,
  buscaCep,
  setLongLat
} from '../../redux/ducks/Post'
import {setEndereco} from '../../redux/ducks/MeusPosts/index'
import Input from '../../components/subComponentes/Input'
import ButtonOption from '../../components/subComponentes/ButtomOption' 
// import { Container } from './styles';
import Toast from 'react-native-simple-toast'
function ConfigEndereco(props) {
  //const [endereco,setPost] = useState({});
  const [cancel,setCancel] = useState(false);
  const endereco = useSelector(state => state.post.post.endereco);
  const cep = useSelector(state => state.meusposts.cep);
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setEndereco(props.post.endereco));
    },[])
    function prosseguir(){
      if(endereco.cep !== '' 
      && endereco.rua !== ''
      && endereco.numEndereco !== ''
      && endereco.long !== '' 
      && endereco.lat !== '' && endereco.cidade !== ''){
        dispatch(setEndereco(endereco));
        props.navigation.goBack();
        Toast.show('Informações salvas');
      }else{
        Alert.alert('Ops!!!','Por favor, preencha todas as informações obrigatórias');
      }
    }
    function set(){
      let num = parseInt(endereco.cep)
      num !== '' && !Number.isNaN(num) ? dispatch(buscaCep(num)) : null
    } 

    function SetLongLat(){
        const { rua, numEndereco } = endereco;
        dispatch(setLongLat(rua,numEndereco));
    }

   function setInputRua(rua){
        dispatch(setRua(rua));
    }
  return (
    <View style={{flex:1}}>
                <View style={{
                    height:100,
                    justifyContent:'center',
                    paddingLeft:14,
                    paddingRight:12}}>
                    <Text style={{
                        fontSize:20,
                        color:'#57CF87',
                        textAlign:'justify',
                        fontWeight : 'bold'
                        }}>Sobre a localização</Text>
                    <Text style={{color:"#07000F"}}>(Saber a localização é essencial para quem está buscando uma moradia)</Text>
                </View>
                <KeyboardAvoidingView style={{flex:1,backgroundColor:'white'}}>
                    <Input 
                    title='CEP *' 
                    erro={cep ? '':'erou cep'}
                    placeholder='Ex : 63708330' 
                    value={endereco.cep} 
                    onChangeText={(cep)=>{dispatch(setCep(cep))}}
                    onEndEditing={()=>{set()}}
                    />
                    
                    <View style={{paddingLeft:16,flex:1}}>
                   {cep ? null : <Text style={{color:'red'}}>Por favor, insira um cep válido!</Text> }
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{height:340,width:'100%'}}>
                        <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'}}>
                        <Input
                        erro={''}
                        title='CIDADE *'
                        editable={false}
                        placeholder='Ex : Quixadá'
                        value={endereco.cidade} 
                        onChangeText={(cidade)=>{dispatch(setCidade(cidade))}}
                        />
                        <Input 
                        erro = {''}
                        flex={true}
                        editable={false}
                        title='ES *' 
                        placeholder='ES'
                        maxLength={2}
                        value={endereco.estado} 
                        onChangeText={(estado)=>{dispatch(setEstado(estado))}}
                        />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Input 
                        title='RUA *'
                        erro={''}
                        placeholder='Ex : Rua Eduardo Albuquerque'
                        value={endereco.rua} 
                        editable={cep ? true:false}
                        onChangeText={(rua)=>{setInputRua(rua)}}
                        onEndEditing={SetLongLat}
                        />
                        <Input
                        title='Nº *'
                        erro={cep ? '': cep && endereco.numEndereco !== '' ? '':'erro no numero'}
                        placeholder='Nº'
                        flex={true}
                        onEndEditing={SetLongLat} 
                        value={endereco.numEndereco} 
                        onChangeText={(numero)=>dispatch(setNumEndereco(numero))}
                        />
                        </View>
                        <Input 
                        erro={cep ? '':'Erro no bairro'}
                        title='BAIRRO'
                        placeholder='Ex : Centro'
                        value={endereco.bairro} 
                        onChangeText={(bairro)=> {dispatch(setBairro(bairro))}}
                        />
                    </View>
                    <View style={{marginBottom:40}}>
                    <ButtonOption 
                        title='Salvar'
                        ativo
                        function={prosseguir}
                        height={50}
                        width={Dimensions.get('window').width/1.4}
                        />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
  );
}
export default React.memo(ConfigEndereco)
