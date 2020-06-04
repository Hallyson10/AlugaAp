import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StatusBar, View,Dimensions,ImageBackground,KeyboardAvoidingView,TouchableOpacity,Alert } from 'react-native'

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
 import Input from '../../components/subComponentes/Input'
 import ButtonOption from '../../components/subComponentes/ButtomOption'

function FormLocation(props) {
    const dispatch = useDispatch();
    let endereco = useSelector(state => state.post.post.endereco);
    let cepErro = useSelector(state => state.post.cepErro);
    let cepTrue = useSelector(state => state.post.cepTrue);
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
                <StatusBar backgroundColor='#57CF87' /> 
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
                    erro={'erou cep'}
                    placeholder='Ex : 63708330' 
                    value={endereco.cep} 
                    onChangeText={(cep)=>{dispatch(setCep(cep))}}
                    onEndEditing={()=>{set()}}
                    />
                    {cepErro ? 
                    <View style={{paddingLeft:16,flex:1}}>
                    <Text style={{color:'red'}}>Por favor, insira um cep válido!</Text> 
                    </View>
                    : null}
                    {cepTrue ?
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ImageBackground style={{width:'100%',height:400,position:'relative'}} 
                    imageStyle={{height:400,width:'100%'}} source={require('../../images/back4.png')} >
                        <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'}}>
                        <Input
                        erro={'Erro cidade'}
                        title='CIDADE'
                        placeholder='Ex : Quixadá'
                        value={endereco.cidade} 
                        onChangeText={(cidade)=>{dispatch(setCidade(cidade))}}
                        />
                        <Input 
                        erro = {'erro estado'}
                        flex={true}
                        title='ESTADO' 
                        placeholder='ES'
                        maxLength={2}
                        value={endereco.estado} 
                        onChangeText={(estado)=>{dispatch(setEstado(estado))}}
                        />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Input 
                        title='RUA'
                        erro={''}
                        placeholder='Ex : Rua Eduardo Albuquerque'
                        value={endereco.rua} 
                        onChangeText={(rua)=>{setInputRua(rua)}}
                        onEndEditing={SetLongLat}
                        />
                        <Input
                        title='Nº'
                        erro={'erro no numero'}
                        placeholder='Nº'
                        flex={true}
                        onEndEditing={SetLongLat} 
                        value={endereco.numEndereco} 
                        onChangeText={(numero)=>dispatch(setNumEndereco(numero))}
                        />
                        </View>
                        <Input 
                        erro={'Erro no bairro'}
                        title='BAIRRO'
                        placeholder='Ex : Centro'
                        value={endereco.bairro} 
                        onChangeText={(bairro)=> {dispatch(setBairro(bairro))}}
                        />
                    </ImageBackground> 
                    <View style={{
                    height:180,alignItems:'center',
                    marginTop:10,
                    }}>
                        <ButtonOption 
                        title='PROSSEGUIR'
                        ativo
                        function={props.prosseguir}
                        height={50}
                        width={Dimensions.get('window').width/1.4}
                        />
                    
                    </View>
                    
                    </View>
                    :null}
                </KeyboardAvoidingView>
            </View>
        )
    
    }
export default React.memo(FormLocation);