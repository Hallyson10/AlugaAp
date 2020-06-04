import React, { useEffect,useState } from 'react'
import { StatusBar,Platform, View, Keyboard, Alert,Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import InputSearch from '../../components/InputSearch'
import Pesquisa from '../../components/Pesquisa/Index'
import Postagens from '../AllPosts/Index'

import { 
  FilterPosts,
} from '../../redux/ducks/Posts/Filters'

import { FindFilterPeoples, FindPeoplesSearching } from '../../redux/ducks/PeoplesSearching'
import Carregamento from '../../components/Carregamentos/CarregandoPosts'
import carregamento from '../../animations/carregamento.json'
import { EnviarEmailVerification,desativaModalEmailEnviado,desativaModalVerificaEmail } from '../../redux/ducks/Profile'
import { Logout } from '../../redux/ducks/Auth'
import ModalConfirmEmail from '../../components/Confirmacoes/ConfirmarEmail'
import SendEmail from '../../components/Confirmacoes/SendEmail'
export default function Posts(props){
    const pesquisaAtiva = useSelector(state => state.post.pesquisaAtiva);
    const emailEnviado = useSelector(state => state.profile.emailEnviado);
    const emailVerified = useSelector(state => state.profile.emailVerified);
    const cidadeSearch = useSelector(state=> state.post.cidadeSearch);
    const loadPosts = useSelector(state => state.post.loadPosts);
    const userId = useSelector(state => state.profile.user.userId);
    const [atived,setAtived] = useState(false);

    const dispatch = useDispatch();
    
    
    function filterPosts(){
      props.navigation.navigate('Filter');
    }
    function functionFilter(cidade){
      dispatch(FilterPosts(cidade,userId));//filtrar posts apenas pela cidade
    }
    function sendEmailVerification(){
        dispatch(EnviarEmailVerification());
        dispatch(Logout());
    }
    useEffect(()=>{
        setTimeout(()=>{
            setAtived(true);
        },9000)
    },[])

        return (
            <View style={{flex:1,backgroundColor:'#F1EDED'}}>
              <StatusBar backgroundColor='#F9FFF0' />
              <InputSearch  
              optionSearch={(cidade)=>this.optionSearch(cidade)}
              filter = { () => filterPosts()}
              filtrar='vagas'
              navigation={props.navigation}
               />
               
               {
                 pesquisaAtiva? <Pesquisa functionFilter={(cidade)=>functionFilter(cidade)}/> : 
                  <Postagens navigation={props.navigation}/>
               }
               <ModalConfirmEmail visible={emailEnviado} onPress={()=>dispatch(desativaModalEmailEnviado())
               } />
               <SendEmail
                back={()=>{
                dispatch(desativaModalVerificaEmail())
                dispatch(Logout());
                }
                }
                onPress={sendEmailVerification} 
                visible={emailVerified}/>
            </View>
        )
}
