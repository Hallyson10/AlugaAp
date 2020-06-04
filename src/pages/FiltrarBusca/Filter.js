import React, { Component,useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View ,TouchableOpacity,Dimensions,Keyboard,Alert} from 'react-native'
import FilterComponent from '../../components/OpcoesDeFiltro/Filter'
import ButtonOption from '../../components/subComponentes/ButtomOption'
import InputSearch from '../../components/InputSearch'
import Pesquisa from '../../components/Pesquisa/Index'
import { 
    searchCidade, 
    FilterNamePosts, 
    tivaPesquisa, 
    limpaCidadeBusca,
    SelectTypeVagaCompartilhada,
    SelectTypeVagaCompleta,
    FilterPosts,
    SelectType
} from '../../redux/ducks/Posts/Filters'

export default function Filter(props) {
        const dispatch = useDispatch();
        let pesquisaAtiva = useSelector(state => state.post.pesquisaAtiva);
        const cidadeSearch = useSelector(state=> state.post.cidadeSearch);
        const compartilhada = useSelector(state => state.filter.compartilhada);
        const completa = useSelector(state => state.filter.completa);
        const userId = useSelector(state => state.profile.user.userId)
        function FiltrarVaga(){
            if(cidadeSearch !== ''){
                dispatch(SelectType(true));//ativa o type dizendo que a busca é com filtro pra puxar mais dados com filtro
                dispatch(FilterPosts(cidadeSearch,userId,completa,'filterVagas'));
                props.navigation.goBack();
            }else{
                Alert.alert('Ops!','Por favor selecione uma cidade de destino!')
            }
        }
        
        return (
            <View style={{flex:1}}>
                <InputSearch 
                filterOption  //type pesquisa
                back={()=>props.navigation.goBack()}
                />
                {
                 pesquisaAtiva? <Pesquisa functionFilter={()=>{}} /> : //instanciei a função apenas pra não ter erro no options de pesquisa
                 <FilterComponent 
                 compartilhada={compartilhada}
                 completa={completa} 
                 filtrar={()=>FiltrarVaga()}
                 onPressCompartilhada={()=>dispatch(SelectTypeVagaCompartilhada())}
                 onPressCompleta={()=>dispatch(SelectTypeVagaCompleta())}
                 navigation={props.navigation}/>
               }
            </View>
        )
    
}
