import firebase from '../../../Service/index'
import { Linking } from 'react-native';
import Toast from 'react-native-simple-toast';
import Type from './types'
const bd = firebase.firestore()
const initialState = {
    usuariosSolicitantes : [],
    solicitacoesAceitas : [],
    erroSolicitacao : {},
    loadSolicitacaoPendentes : false,
    loadSolicitacaoAceitas : false,
    newSolicitacaoAceita : false,
    countPendentes : 0,
    countAceitas : 0,
    newSolicitacaoPendente : false,
    viewPendente : false,
    viewAceitas : false
  };
  
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Type.SETSOLICITACAO : return {
            ...state,
            usuariosSolicitantes : action.payload
        }
        case Type.COUNTPENDENTES : return {
            ...state,
            countPendentes : action.payload
        }
        case Type.COUNTACEITAS : return {
            ...state,
            countAceitas : action.payload
        }
        case Type.ERROSOLICITACAO : return {
            ...state,
            erroSolicitacao : action.payload
        }
        case Type.SETSOLICITACAOACEITA : return {
            ...state,
            solicitacoesAceitas : action.payload
        }
        case 'LOADSOLICITACAOPENDENTE' : return{
            ...state,
            loadSolicitacaoPendentes : action.payload
        }
        case 'ACEITARSOLICITACAO' : return {
            ...state,
            loadSolicitacaoAceitas : action.payload
        }
        case 'LOGOUT' : 
        return {
            ...state,
            newSolicitacaoPendente:false,
            ...initialState
        }
        case 'SETNEWSOLICITACOESPENDENTES' : 
        return {
            ...state,
            newSolicitacaoPendente : action.payload
        }
        case 'SETNEWSOLICITACOESACEITAS' : return {
            ...state,
            newSolicitacaoAceita : action.payload
        }
        case "SETVIEWPENDENTE" : return {
            ...state,
            viewPendente : action.payload
        }
        case "SETVIEWACEITAS" : return {
            ...state,
            viewAceitas : action.payload
        }
        default:
        return state;
    }
}
export function setViewPendente(tipo){
        return {
            type : 'SETVIEWPENDENTE',
            payload : true
        }
}
export function setViewAceitas(){
    return {
        type : "SETVIEWACEITAS",
        payload : true
    }
}
export function SendMessage(data, emissor_id){
    //data precisa ter número de telefone e id
    return dispatch => {
        async function enviarMensagem(){
            if(data.idAutor !== emissor_id){
            let userVerification = await VerificaPermissao(emissor_id, data.idAutor);
            if(userVerification || data.permissionNumber){
                await Linking.canOpenURL(`whatsapp://send?text=${data.mensageWhats}`).then(supported => {
                if (supported) {
                return Linking.openURL(
                    `whatsapp://send?phone=${data.phone}&text=${data.mensageWhats}`
                );
                } else {
                return Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${data.phone}&text=${data.mensageWhats}`
                );
                }
            }).catch((error)=>{
                return ;
        })
        }else if(data.permissionNumber === false){
            await solicitarPermissao(data,emissor_id); // caso não esteja nos permitidos eu envio a solicitação
            await updateNotification(data.idAutor,'pendente');
        }}else{
            Toast.show('Não permitido enviar mensagem para você mesmo!');
            return ;
        }
    }
    enviarMensagem();
}
}
function solicitarPermissao(data,id_solicitante){
            try {
            let id_solicitado = data.idAutor;
             let erros = {}
             id_solicitante === id_solicitado ? erros.idIguais = 'Não Permitido!' : null
            if(Object.keys(erros).length > 0){
                return;
            }
            async function solicita(){
                await bd.collection('solicitacoes')
                .doc(id_solicitado).collection('pendentes').doc(id_solicitante)
                .set({
                    status : 'pendente',
                    date : new Date().getTime(),
                    id_solicitante,
                    data,
                    novaMensage : true
                })
                return true;
            }
            solicita();
            Toast.show('Solicitação enviada'); 
            return true;           
            } catch (error) {
                console.log('erro solicitar permissao',error)
            }
}


async function VerificaPermissao(id_solicitante, id_solicitado){
                let exist = await bd.collection('permissao')
                .doc(id_solicitante).collection('permitidos').where('id_solicitante','==',id_solicitado)
                .get()
                let resul = await exist.docs
                if(resul.length >= 1){
                    return true;
                }else{
                    return false;
                }
}
async function updateNotification(id_receptor,type){
    try {
       
        if(type === 'pendente'){
            await bd.collection('notificationPendente')
            .doc(id_receptor).set({
                "newSolicitacaoPendente" : true,
                "countPendentes" : firebase.firestore.FieldValue.increment(1),
                "userId" : id_receptor
            })
            return;
        }else{
            await bd.collection('notificationAceita')
            .doc(id_receptor).set({
                "newSolicitacaoAceita" : true,
                "countAceitas" : firebase.firestore.FieldValue.increment(1),
                "userId" : id_receptor
            })
            return;
        }
    
    } catch (error) {
        return false;
    }
   
}

export function PermitirAcessoAoNumero(id_solicitante,data){
    return async dispatch => {
        let id_solicitado = data.user.userId;//outro usuario que solicitou
        try {
               
                 //insere na coleção do user solicitado o user solicitante
                 bd.collection('permissao').doc(id_solicitado)
                .collection('permitidos').doc(id_solicitante).set({
                    status : 'permitido',
                    id_solicitante,
                    date : new Date().getTime(),
                    data,
                    novaMensage : true
                })
                bd.collection('permissao').doc(id_solicitante)
                .collection('permitidos').doc(id_solicitado).set({
                    status : 'permitido',
                    id_solicitante :id_solicitado,
                    date : new Date().getTime(),
                    data,
                    novaMensage : true
                })
                async function permitir(){
                    //exclui o solicitado dos pendentes
                    bd.collection('solicitacoes')
                    .doc(id_solicitante).collection('pendentes').doc(id_solicitado).delete();
                    //verifica se o solicitado tbem esta nos pendentes de solicitante
                    const verificaPendentesSolicitado = await bd.collection('solicitacoes')
                    .doc(id_solicitado).collection('pendentes').doc(id_solicitante);
                    const doc = verificaPendentesSolicitado.get()
                    if(doc.exists){
                        verificaPendentesSolicitado.delete();
                        bd.collection('notificationPendente').doc(id_solicitado).delete();
                        dispatch({type : Type.COUNTPENDENTES,payload:0})
                    }
                     bd.collection('notificationPendente').doc(id_solicitante).delete();
                     updateNotification(id_solicitado,'aceita');
                     //limpa os usuários pendentes novamente para não aparece o usuário que enviou
                     dispatch({type:Type.SETSOLICITACAO ,payload : []})

            }
            permitir();
            return;
        } catch (error) {
            console.log(error)
            return;
        }
        }
}
// export function setLoadSolicitacaoAceita(payload){
//     return {
  
//     }
// }
async function finduser(idAutor){
    let refUser = await bd.collection('users').doc(idAutor).get();
    let res = await refUser.data();
    let { username,userId,fotosPerfil,sexo,idade,statusOnline } = await refUser.data().user;
    let user = {
        username,userId,
        fotosPerfil,sexo,
        idade,statusOnline
    }
    return user
}
export function getSolicitacoesAceitas(userId){
    return dispatch => {
        try {
            async function findAceitas(){
                const find = await bd.collection('permissao').doc(userId).collection('permitidos');
    
                find.onSnapshot({includeMetadataChanges : false},async(item)=>{
                    const data = item.docs.map((item)=>item.data());
                   
                        const user = await Promise.all(data.map(async (item)=> {
                            const dataUser = await finduser(item.id_solicitante);
                            console.log(dataUser)
                            return { item,user : dataUser };
                        }))
                        dispatch({ type : Type.SETSOLICITACAOACEITA, payload : user });
                        const notification = await bd.collection('notificationAceita')
                    .doc(userId).get();
                    const dataNotification = notification.data()
                    if(notification.exists){
                        if(dataNotification.newSolicitacaoAceita){
                            dispatch({ type : 'SETNEWSOLICITACOESACEITAS', payload : true });
                            dispatch({ type : Type.COUNTACEITAS, payload : dataNotification.countAceitas})
                            return;
                        }
                        dispatch({ type : 'SETNEWSOLICITACOESACEITAS', payload : false });
                        dispatch({ type : Type.COUNTACEITAS, payload : 0});
                        return;
                    }
                    return;
                })
            }
            findAceitas();
        } catch (error) {
            console.log(error);
        }
    }
}
export function getSolicitacoesPendentes(userId){
    return dispatch =>{ 
    try {
        async function findPendentes(){
            let pendentes = await bd.collection('solicitacoes')
            .doc(userId);

            let tentativa = await pendentes.collection('pendentes');

            tentativa.onSnapshot({includeMetadataChanges : false},async(item)=>{
                const data = item.docs.map(item => item.data());
                    const user = await Promise.all(data.map(async (item)=>{
                        const dataUser = await finduser(item.id_solicitante);
                        return {item,user : dataUser};
                    }))
                    dispatch({ type : Type.SETSOLICITACAO, payload : user})
            
                    const notification = await bd.collection('notificationPendente')
                    .doc(userId).get();
                    const dataNotification = notification.data()
                    if(notification.exists){
                        if(dataNotification.newSolicitacaoPendente){
                            //dispatch({ type : 'SETNEWSOLICITACOESPENDENTES', payload : true });
                            dispatch({ type : Type.COUNTPENDENTES, payload : dataNotification.countPendentes})
                            return;
                        }
                            dispatch({type :'SETNEWSOLICITACOESPENDENTES', payload : false });
                            dispatch({ type : Type.COUNTPENDENTES, payload : 0});
                            return;
                    }
                    return;
            })
        }
        findPendentes();
    } catch (error) {
        dispatch({type :'SETNEWSOLICITACOESPENDENTES', payload : false });
        return new Error(error);
    }
    }
}
function RecusarAcessoAoNumero(id_solicitante, id_solicitado){
    async function recusar(){
        await bd.collection('solicitacoes')
        .doc(id_solicitado).collection('pendentes').doc(id_solicitante).delete();
        console.log('recusado')
    }
    recusar();
}
export function resetaNotificaoesPendentes(userId){
    return dispatch => {
        try {
            async function reseta(){
                await bd.collection('notificationPendente')
                                            .doc(userId).delete();

                    dispatch({type :'SETNEWSOLICITACOESPENDENTES', payload : false });
                    dispatch({ type : Type.COUNTPENDENTES, payload : 0})
                    return true;
            }
            reseta();
        } catch (error) {
            return false;
        }
    }
}
export function verificaNotifPendente(userId){
    return dispatch => {
       async function verifica(){
        const notification = await bd.collection('notificationPendente')
        .doc(userId).get();
        const dataNotification = notification.data()
        if(notification.exists){
            if(dataNotification.newSolicitacaoPendente){
                dispatch({type :'SETNEWSOLICITACOESPENDENTES', payload : true });
                dispatch({ type : Type.COUNTPENDENTES, payload : dataNotification.countPendentes})
            }
        }
       }
       verifica();
    }
}

export function resetaNotificaoesAceitas(userId){
    return dispatch => {
        try {
            async function reseta(){
                await bd.collection('notificationAceita')
                        .doc(userId).delete();

                    dispatch({type :'SETNEWSOLICITACOESACEITAS', payload : false });
                    dispatch({ type : Type.COUNTACEITAS, payload : 0})
                    return true;
            }
            reseta();
        } catch (error) {
            return false;
        }
    }
}
export function verificaNotifAceita(userId){
    return dispatch => {
        try {
            async function verifica(){
                const notification = await bd.collection('notificationAceita')
                .doc(userId).get();
                const dataNotification = notification.data()
                if(notification.exists){
                    if(dataNotification.newSolicitacaoAceita){
                        alert('verificando notifaceitas')
        
                        dispatch({type :'SETNEWSOLICITACOESACEITAS', payload : true });
                        dispatch({ type : Type.COUNTACEITAS, payload : dataNotification.countAceitas})
                    }
                }
               }
               verifica();
               return true;
        } catch (error) {
            return false;
        }
      
    }
}



