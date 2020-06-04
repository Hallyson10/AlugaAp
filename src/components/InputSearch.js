import React, { Component,useEffect } from 'react'
import { Text, StyleSheet, View, TextInput,TouchableOpacity,FlatList,SafeAreaView, Keyboard,Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {FindPosts} from '../redux/ducks/Post'
import styled from '../colors'
import { 
    FilterNamePosts,SelectType,
    searchCidade ,ativaPesquisa,
    limpaCidadeBusca ,
    LimpaFiltroPeople } from '../redux/ducks/Posts/Filters'
import { FindFilterPeoples, FindPeoplesSearching } from '../redux/ducks/PeoplesSearching'
import ButtonInput from './subComponentes/ButtonInputSearch'
import Icon from 'react-native-vector-icons/AntDesign'
let time = null
const { width , height } = Dimensions.get('window');
function InputSearch(props) {
    const cidadeSearch = useSelector(state => state.post.cidadeSearch);
    const pesquisaAtiva = useSelector(state => state.post.pesquisaAtiva);
    const userId = useSelector(state => state.profile.user.userId)

    const dispatch = useDispatch();
    
    function mostra(){
        dispatch(ativaPesquisa(true));
    }
    
    function temp(letra){
      console.log('time',time);       
      clearTimeout(time);

        time = setTimeout(()=>{
          dispatch(FilterNamePosts(letra));//busca os nomes das cidades cadastradas
        },300);
    }


    function findBusca(cidade){
        dispatch(searchCidade(cidade));//modifica reducer
        temp(cidade);
        dispatch(SelectType(false));
      }
      function limpaBusca(){
        dispatch(ativaPesquisa(false));//fecha as opções de pesquisa
        dispatch(limpaCidadeBusca());//limpa nome da cidade no reducer
        dispatch(LimpaFiltroPeople())
        dispatch(SelectType(false));
        Keyboard.dismiss();
      }
      function limpaEbusca(){
        dispatch(limpaCidadeBusca());//limpa nome da cidade no reducer
        dispatch(FindPosts(userId)); //limpa e busca posts
        dispatch(FindPeoplesSearching(userId)); //limpa e buscapessoasprocurando
        dispatch(LimpaFiltroPeople())
      }
        return (
             <>
            <SafeAreaView style={styles.cabecalho}>
            <View style={styles.linearGradient}>
            <View style={{paddingTop:4,paddingLeft:4,flex:1,justifyContent:'center'}}>
                        <Text style={[styles.marcaNome,{color:styled.principal}]}>AlugaAp</Text>
            </View>
            <View style={{flexDirection:'row',height:height / 14,marginBottom:12,marginTop:10}}>
            {props.filterOption? <View style={{
            backgroundColor:'#F1EDED',
            marginRight:6,
            alignItems : 'center',
            justifyContent:'center',
            width: 50,borderRadius:60,
            height:height / 14}}>
                <Icon size={28} name='left' style={{color:props.color || styled.padrao}} onPress={props.back}/>
            </View> : null}
            <View style={styles.container}>
            <Icon size={22} name='search1' color={styled.padrao}/>
            <View style={{flex:1}}>
            <TextInput 
                style={{
                color:styled.padrao,
                height:50,
                fontSize:18,
                alignItems:'center'}}
                returnKeyType='search'
                selectionColor='#07000F'
                keyboardAppearance='dark'
                onChangeText={(cidade)=>{findBusca(cidade)}}
                value={cidadeSearch}
                onFocus={()=>mostra()}
                placeholder='Buscar na cidade' 
                />
                </View>
                { pesquisaAtiva ? 
                <ButtonInput onPress={limpaBusca} text='Cancelar' />
                 : cidadeSearch === '' && props.filterOption ? null :
                 cidadeSearch === '' ? 
                 <ButtonInput  onPress={props.filter} text='Filtrar' />
                 :
                 <ButtonInput onPress={limpaEbusca} text='Limpar' />
                }
                </View>
                </View>
            </View>
            </SafeAreaView>
            </> 
        )
    
}


const styles = StyleSheet.create({
    cabecalho : {
        height: height / 7,
        justifyContent:'center',
        backgroundColor:'#fff'
        //backgroundColor:'#050A02',//#050A02
    },
    container : {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#F1EDED',
        height:height / 14.0,
        width:'100%',  
        paddingLeft: 10,
        marginBottom:10,
        borderRadius: 20,
        paddingRight:10
    },
    marcaNome:{
        fontSize:18,fontWeight:'bold'
        //'#050A02'
    },
    linearGradient: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backfaceVisibility:'visible',
  }
})
export default React.memo(InputSearch)