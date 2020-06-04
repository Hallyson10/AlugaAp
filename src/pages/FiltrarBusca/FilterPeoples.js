import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity,Alert } from 'react-native'
import {FindFilterPeoples} from '../../redux/ducks/PeoplesSearching'
import Button from '../../components/subComponentes/ButtomOption'
import InputSearch from '../../components/InputSearch'
import Pesquisa from '../../components/Pesquisa/Index'
import FilterOption from '../../components/OpcoesDeFiltro/FilterPeoples'
import { SelectTypeMasculino,SelectTypeFeminino } from '../../redux/ducks/Posts/Filters'
const FilterPeoples = (props) => {
    const dispatch = useDispatch();

    let pesquisaAtiva = useSelector(state => state.post.pesquisaAtiva);
    let masculino = useSelector(state => state.filter.masculino);
    let feminino = useSelector(state => state.filter.feminino);
    let cidadeSearch = useSelector(state => state.post.cidadeSearch)

    async function Filtrar(){
        if(cidadeSearch !== ''){
            let op;
            masculino ? op = 'M' : 'F'
            dispatch(FindFilterPeoples(cidadeSearch,op,'filterSexo'));
            props.navigation.goBack();
        }else{
            Alert.alert('Ops!','Por favor, insira a cidade onde deseja encontrar colegas!')
        }
        
    }
    return (
        <View style={{flex:1}}>
            <InputSearch back={()=>props.navigation.goBack()} filterOption/>
            {pesquisaAtiva ?     <Pesquisa /> : 
            <FilterOption
            filtrar={()=>Filtrar()}
            masculino={masculino}
            feminino={feminino}
            setMasculino={()=>dispatch(SelectTypeMasculino())}
            setFeminino={()=>dispatch(SelectTypeFeminino())}
            />}
         
        </View>
    )
}

export default FilterPeoples
