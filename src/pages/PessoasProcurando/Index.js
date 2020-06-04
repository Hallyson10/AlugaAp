import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text,SafeAreaView } from 'react-native'
import InputSearch from '../../components/InputSearch'
import Pesquisa from '../../components/Pesquisa/Index'
import PeoplesSearching from '../PessoasProcurando/PeoplesSearching'
import CarregandoPosts from '../../components/Carregamentos/CarregandoPosts'
import carregamentoPeoples from '../../animations/carregamentoPeoples'
import { FindFilterPeoples } from '../../redux/ducks/PeoplesSearching'
const Index = React.memo((props) => {
    const dispatch = useDispatch();
    const pesquisaAtiva = useSelector(state => state.post.pesquisaAtiva);
    const loadPeoples = useSelector(state => state.peopleSearching.loadPeoples);
    const cidadeSearch = useSelector(state => state.post.cidadeSearch)
    function functionFilter(cidade){
        dispatch(FindFilterPeoples(cidade))//(city,sexo,type)
    }
    try {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} >
                <InputSearch 
                filter={()=>props.navigation.navigate('FilterPeoples')}
                filtrar='peoples' 
                navigation={props.navigation} />
                <CarregandoPosts 
                carregamento={carregamentoPeoples}
                visible={loadPeoples}
                 />
                {
                     pesquisaAtiva? <Pesquisa 
                     functionFilter = {(cidade)=>functionFilter(cidade) }/> : 
                     <>
                     
                      <PeoplesSearching 
                      navigation={props.navigation}
                      horizontal={false}
                      item={props.item}
                      />
                      </>
                   }
            </SafeAreaView >
        )
    } catch (error) {
        return(
        <View>
            <Text>Ocorreu um erro inexperado</Text>
        </View>
        )
    }
    
})

export default Index
