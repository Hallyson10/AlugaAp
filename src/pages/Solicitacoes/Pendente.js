import React,{useEffect,useLayoutEffect,useCallback,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList, Alert } from 'react-native'
import Cabecalho from '../../components/subComponentes/CabecalhoInteressados'
import Toast from 'react-native-simple-toast';
import { 
    getSolicitacoesPendentes,
    PermitirAcessoAoNumero,
    resetaNotificaoesPendentes, 
    setViewPendente } 
from '../../redux/ducks/EntrarEmContato/Mensagem'


const Index = () => {
    const dispatch = useDispatch();
    const  view = useSelector(state => state.mensagem.viewPendente);
    const user = useSelector(state => state.profile.user)
    let erroSolicitacao = useSelector(state=>state.mensagem.erroSolicitacao)
    const usuariosSolicitantes = useSelector( state => state.mensagem.usuariosSolicitantes);
    const newSolicitacaoPendente = useSelector(state => state.mensagem.newSolicitacaoPendente);
    const countPendentes = useSelector(state => state.mensagem.countPendentes);

    const findPendentes = useCallback(()=>{
            dispatch(getSolicitacoesPendentes(user.userId));
    },[newSolicitacaoPendente,getSolicitacoesPendentes]);

    useEffect(() => {
         if(!view){
            findPendentes();
            dispatch(setViewPendente());
            //verifica se tm notificação se tiver limpa as notificações
        if(newSolicitacaoPendente){
            setTimeout(()=>{
            dispatch(resetaNotificaoesPendentes(user.userId));
            },4000)
            }
         }
        
    },[newSolicitacaoPendente])

    function Aceita(id_solicitado, vaga){
        dispatch(PermitirAcessoAoNumero(id_solicitado, vaga));
    }
    return (
        <View style={{flex:1,justifyContent:'center'}}>
         <View style={{height : 68,backgroundColor:'#FFF',paddingLeft:14,paddingTop:20}}>
            <Text style={{fontSize:26,fontWeight:'bold',color:'#051E0B'}}>Notificações</Text>
        </View>
            <FlatList
                data={usuariosSolicitantes}
                keyExtractor={item => item.item.id_solicitante}
                key={item => item.item.id_solicitante}
                ListHeaderComponent={
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:18,fontWeight:'bold',color:'#051E0B'}}>Pendentes</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:countPendentes >= 1 ?'#E83D66' : '#5E10C0'}}>Novas {countPendentes}</Text>
                </View>
                }
                ListHeaderComponentStyle={{paddingLeft:14,paddingRight:14}}
                
                renderItem={({item})=>
                        <Cabecalho 
                        key={item=>item.item.id_solicitante}
                        image={item.user.fotosPerfil.uri} 
                        time={item.item.date} 
                        username={item.user.username} 
                        title='Aceitar'
                        titleInformation='Solicitou '
                        onPress={()=>Aceita(user.userId,item)}
                        />
                }
                />
            <View>
                <Text>{erroSolicitacao.idIguais}</Text>
            </View>
        </View>
    )
}

export default React.memo(Index)
