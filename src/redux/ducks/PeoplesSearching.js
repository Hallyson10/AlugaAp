import { Types } from '../types'
import {Alert} from 'react-native'
import firebase from '../../Service/index'
const bd = firebase.firestore();

const initialState = {
    colegasSearching : [],
    citySearching : '',
    cidadeComparator : '',
    coord : { lat :0, long : 0},
    tipoBuscaCompartilhada : true,
    bairro : '',
    descricao : '',
    urgente : false,
    ativou : new Date().toISOString(),
    buscando : false,
    isVisibleModalProfile : false,
    userSearchModal : {user:{fotosPerfil:{uri:''}}},//pra não causar erro no modal na imagem do user
    loadPeoples : false
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case Types.FINDPEOPLESEARCHING : return {
            ...state,
            colegasSearching : action.payload
        }
        case Types.CIDADEBUSCA : return {
            ...state,
            citySearching : action.payload,
            cidadeComparator : action.payload
        }
        case Types.BAIRRO : return {
            ...state,
            bairro : action.payload
        }
        case Types.DESCRICAO : return {
            ...state,
            descricao : action.payload
        }
        case Types.URGENTEBUSCA : return {
            ...state,
            urgente : action.payload
        }
        case Types.SETBUSCA : return {
            ...state,
            buscando : action.payload
        }
        case Types.SETMODALPROFILE : return {
            ...state,
            isVisibleModalProfile : action.payload
        }
        case Types.SETUSERMODAL : return{
            ...state,
            userSearchModal : action.payload
        }
        case Types.SETTIPOBUSCA : return {
            ...state,
            tipoBuscaCompartilhada : action.payload
        }
        case Types.LOADPEOPLES : return {
            ...state,
            loadPeoples: action.payload
        }
        case Types.LIMPAFORMPEOPLES : return {
            ...state,
            citySearching : '',
            tipoBuscaCompartilhada : false,
            bairro : '',
            descricao : '',
            urgente : false
        }
        case 'LOGOUT' : return {
            ...state,
            ...initialState
        }
        default:
            return state;
    }
}

export const ativaModalProfile = (user) => {
    return dispatch =>{
        dispatch({type: Types.SETUSERMODAL, payload: user});
        dispatch({type:Types.SETMODALPROFILE, payload : true});
    }
}
export const desativaModalProfile = () => {
    return dispatch =>{
    dispatch({type:Types.SETMODALPROFILE, payload : false})
    dispatch({type: Types.SETUSERMODAL, payload: {user:{fotosPerfil:[{url:''}]}}});
    }
    
}
function retira_acentos(str) 
    {
        com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        novastr="";
        for(i=0; i<str.length; i++) {
            troca=false;
            for (a=0; a<com_acento.length; a++) {
                if (str.substr(i,1)==com_acento.substr(a,1)) {
                    novastr+=sem_acento.substr(a,1);
                    troca=true;
                    break;
                }
            }
            if (troca==false) {
                novastr+=str.substr(i,1);
            }
        }
        return novastr;
    }
export const cidadeBusca = (cidade) =>{
    try {
        return dispatch=>{
            dispatch({type : Types.CIDADEBUSCA ,payload : cidade})
        }
    } catch (error) {
        
    }
    
}
export const setTipoVaga = (tipo) => {
    try {
        return {
            type : Types.SETTIPOBUSCA,
            payload : tipo
        }
    } catch (error) {
        
    }
}

export const bairroBusca = (bairro) =>{
    return {
        type : Types.BAIRRO ,
        payload : bairro
    }
}
export const descricaoBusca = (descricao) =>{
    return {
        type : Types.DESCRICAO ,
        payload : descricao
    }
}
export const urgenteBusca = (value) => {
    return {
        type : Types.URGENTEBUSCA,
        payload : value
    }
}
export const setBusca = (value) =>{
    return {
        type : Types.SETBUSCA ,
        payload : value
    }
}
async function verificaQtdBuscas(userId){
        try {
            const data = await bd.collection('users').doc(userId).get();
            const res = data.data();
            if(res && res.user.qtdBuscas < 1){
                return true;
            }
            return false;
        } catch (error) {
            return false
        }
}
export const StartSearch = (data) => {
    try {
        return async dispatch => {
            if(await verificaQtdBuscas(data.userId)){
            let cidadeComparate = retira_acentos(data.cidadeComparator);
            let mCidade = cidadeComparate.toLowerCase();
            await bd.collection('PeoplesSearching').add({
                userId : data.userId,
                ativou : new Date().getTime() ,
                citySearching : data.citySearching,
                bairro : data.bairro,
                descricao : data.descricao,
                urgente : data.urgente,
                cidadeComparator : mCidade,
                tipoBuscaCompartilhada  : data.tipoBuscaCompartilhada ,
                sexo : data.sexo
            });
            await bd.collection('users').doc(data.userId).update({"user.qtdBuscas" : firebase.firestore.FieldValue.increment(1)})
            let cidadeComparator = mCidade
            let cidade = data.citySearching
            await bd.collection('filterNames').doc(mCidade).set({
                cidadeComparator, //cidade de comparação
                cidade, //nome real da cidade
            })
            dispatch({type:Types.LIMPAFORMPEOPLES})
            return true;
            }else{
                return false;
            }
        }
    } catch (error) {
        return false;
    }
}

export const FindPeoplesSearching = () => {
    try {
        return async dispatch => {
            let ref = await bd.collection('PeoplesSearching').orderBy('urgente','DESC').limit(4)
            .get();
            let response = await Promise.all(ref.docs.map(async(item)=>{
                let res = item.data();
                res.idUnique = item.id;
                let referenciaUser = await bd.collection('users').doc(res.userId).get();
                let user = await referenciaUser.data();
                res.user = user.user;
                return res;
            }))
            dispatch({type : Types.FINDPEOPLESEARCHING , payload : response});
        }

    } catch (error) {
        dispatch({type:Types.LOADPEOPLES,payload : false})
    }
}


export const FindFilterPeoples = (city,sexo,type) => {
    try {
        return async dispatch => {
            try {
            dispatch({type:Types.LOADPEOPLES,payload : true})
            let cityFind = retira_acentos(city);
            let mCidade = cityFind.toLowerCase();
            let ref;
            type === 'filterSexo' ?
            ref = await bd.collection('PeoplesSearching')
            .where('cidadeComparator','==',mCidade)
            .where('sexo','==',sexo).get()
            : ref = await bd.collection('PeoplesSearching').orderBy('cidadeComparator')
            .startAt(mCidade)
            .endAt(mCidade)
            .limit(10)
            .get();

            if(ref.docs.length <= 0){
                dispatch({type : Types.FINDPEOPLESEARCHING , payload : []});
            }
            let response = await Promise.all(ref.docs.map(async(item)=>{
                let res = item.data();
                res.idUnique = item.id;
                let referenciaUser = await bd.collection('users').doc(res.userId).get();
                let user = await referenciaUser.data();
                res.user = user.user;
                return res;
            }))
            dispatch({type : Types.FINDPEOPLESEARCHING , payload : response});
            dispatch({type: Types.LOADPEOPLES, payload : false})
            } catch (error) {
                dispatch({type: Types.LOADPEOPLES, payload : false})
            }
            
        }
    } catch (error) {
        return;
    }
}

export const FindUser = async (userId) => {
    let ref = await bd.collection('users').doc(userId).get();
    let response = ref.data();
    return response;
}