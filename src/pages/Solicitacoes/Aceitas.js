import React,{useEffect,useState,useCallback} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { View, Text, FlatList,SectionList } from 'react-native'
import Cabecalho from '../../components/subComponentes/CabecalhoInteressados'
import { getSolicitacoesAceitas, resetaNotificaoesAceitas, setViewAceitas } from '../../redux/ducks/EntrarEmContato/Mensagem'

const Aceitas = () => {
    const user = useSelector(state => state.profile.user);
    const solicitacoesAceitas = useSelector(state => state.mensagem.solicitacoesAceitas);
    const newSolicitacaoAceita = useSelector(state => state.mensagem.newSolicitacaoAceita);
    const viewAceitas = useSelector(state => state.mensagem.viewAceitas);
    const countAceitas = useSelector( state => state.mensagem.countAceitas);
    const dispatch = useDispatch();

    const findAceitas = useCallback(() => {
        dispatch(getSolicitacoesAceitas(user.userId));
    },[newSolicitacaoAceita,getSolicitacoesAceitas]);
    
    useEffect(() => {
        //marcou que a tela foi visualizada para controle de requisições
            dispatch(setViewAceitas());
            if(!viewAceitas){
                findAceitas();
            }
            //sempre que abrir a tela reseta as notificações
            if(newSolicitacaoAceita){
                setTimeout(()=>{
                    dispatch(resetaNotificaoesAceitas(user.userId));
                },4000)
            }
    },[newSolicitacaoAceita]);

    return (
        <View style={{flex:1,justifyContent:'center'}}>
        <View style={{height : 68,backgroundColor:'#FFF',paddingLeft:14,paddingTop:20}}>
            <Text style={{fontSize:26,fontWeight:'bold',color:'#051E0B'}}>Notificações</Text>
        </View>
            <FlatList
            data={solicitacoesAceitas}
            keyExtractor={item => item.item.id_solicitante}
            ListHeaderComponent={
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#051E0B'}}>Aceitas</Text>
            <Text style={{fontSize:16,fontWeight:'bold',color:countAceitas >= 1 ?'#E83D66' : '#5E10C0'}}>Novas {countAceitas}</Text>
            </View>
            }
            ListHeaderComponentStyle={{paddingLeft:14,paddingRight:14}}
            ListFooterComponent={<Text/>}
            ListFooterComponentStyle={{height:100,backgroundColor:'#FFF'}}
            key={item => item.item.id_solicitante}
            renderItem={({item,index})=>
            <>
                    <Cabecalho 
                    key={item => item.item.id_solicitante}
                    image={item.user.fotosPerfil.uri} 
                    time={item.date} 
                    username={item.user.username} 
                    title='Mensagem'
                    titleInformation='Aceitou '
                    onPress={()=>{alert('enviando mensagem')}}
                    />
            </>
            }
            />
        </View>
    )
}

export default React.memo(Aceitas)
