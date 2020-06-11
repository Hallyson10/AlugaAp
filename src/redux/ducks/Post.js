
import { Types } from '../types'
import TypesCadPost from './Posts/Types'
import types from './MeusPosts/Types'
import {Alert} from 'react-native'
import firebase from '../../Service/index'
import cep from 'cep-promise'
import Geocoder from 'react-native-geocoding'
import {GOOGLE_MAPS_APIKEY} from '../../Service/index'
import update from 'immutability-helper';
import uuid from 'uuid-random';
const db = firebase.firestore();
import Toast from 'react-native-simple-toast'
const { app } = firebase.storage();
const initialState = {
    post : {
        idAutor : '',
        createAt : new Date().getTime(),
        endereco : {
            cep : '',
            cidade : '',
            estado : '',
            bairro : '',
            rua : '',
            numEndereco : '',
            long : '',
            lat : ''
        },
        comodides : {
            geladeira : false,
            fogao : false,
            wifi : false,
            ceramica : false,
            animais : false,
            energia : false,
            tetoForrado : false,
            agua : false,
            garagemC : false,
            garagemM : false
        },
        images : [],
        cidadeComparator : '',
        descricao : 'kkk',
        preferenciaSexo : '',
        qtdVagas : 1,
        qtdQuarto : 0,
        qtdQuartoSuite:0,
        qtdPessoasMorando:0, 
        qtdBanheiros : 1,
        compartilhada : false,
        completa : false,
        individual : false,
        sala : false,
        tipoImovel : '',
        disponivel : true,
        valorTotal : '',
        valorIndividual : 0,
        countLikes:0,
        countComments: 0,
        vagaId : '',
        statusUrgente : false,
    },
    cidadeSearch : '',
    loadInteressados : false,
    loadPosts : false,
    loadMaisPosts : false,
    loadRegisterPost : false,
    loadCep : false,
    optionsFind : [],
    postCadastradoSucesso : false,
    posts : [],
    likaramPost : [],
    click : 0,
    clickPost : 0,
    pesquisaAtiva : false,
    cepTrue : false,
    cepErro : false,
    loadLongLat : false,
    postedPost : false,
    postReserva : {},
    postPerfil : {},
    loadingPostPerfil : false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SETA_POST_PROJETO' : return {
            ...state,
            postPerfil : action.payload
        }
        case 'LOADING_POST_PERFIL' : return {
            ...state,
            loadingPostPerfil : action.payload
        }
        case 'POSTRESERVA' : return {
            ...state,
            postReserva : action.payload
        }
        case 'SETFOTORESERVA' : return {
            ...state,
            postReserva : {...state.postReserva,images:action.payload}
        }
        case TypesCadPost.POSTEDPOST : return {
            ...state,
            postedPost : action.payload
        }
        case types.SETENDERECO : return {
            ...state,
            post : {...state.post,endereco : action.payload}
        }
        case TypesCadPost.TIPOVAGAINDIVIDUAL : 
        return {
            ...state,
            post : {...state.post, individual : true, compartilhada : false, sala : false}
        }
        case TypesCadPost.TIPOVAGACOMPARTILHADA : return {
            ...state,
            post : {...state.post, individual : false, compartilhada : true, sala : false}
        }
        case TypesCadPost.TIPOVAGASALA : return {
            ...state,
            post : {...state.post, individual : false, compartilhada : false, sala : true}

        }
        case TypesCadPost.SETSEXOPREFERENCIA : return {
            ...state,
            post : {...state.post, preferenciaSexo : action.payload}
        }
        case TypesCadPost.INCREMENTQTDVAGAS : return {
            ...state,
            post : {...state.post, qtdVagas : state.post.qtdVagas >= 1 && state.post.qtdVagas <= 50? state.post.qtdVagas + 1 : state.post.qtdVagas}
        }
        case TypesCadPost.DECREMENTQTDVAGAS : return {
            ...state,
            post : {...state.post, qtdVagas : state.post.qtdVagas -1 >= 1 ? state.post.qtdVagas - 1 : 1}
        }
        case TypesCadPost.INCREMENTQTDPESSOASMORANDO: return {
            ...state,
            post : {...state.post, qtdPessoasMorando : state.post.qtdPessoasMorando >= 0 && state.post.qtdPessoasMorando <= 50? state.post.qtdPessoasMorando + 1 : state.post.qtdPessoasMorando}
        }
        case TypesCadPost.DECREMENTQTDPESSOASMORANDO : return {
            ...state,
            post : {...state.post, qtdPessoasMorando: state.post.qtdPessoasMorando -1 >= 0 ? state.post.qtdPessoasMorando - 1 : state.post.qtdPessoasMorando}
        }
        case TypesCadPost.DECREMENTQTDBANHEIROS : return {
            ...state,
            post : {...state.post, qtdBanheiros: state.post.qtdBanheiros -1 >= 1 ? state.post.qtdBanheiros - 1 : state.post.qtdBanheiros}
        }
        case TypesCadPost.INCREMENTQTDBANHEIROS : return {
            ...state,
            post : {...state.post, qtdBanheiros: state.post.qtdBanheiros >= 1 ? state.post.qtdBanheiros + 1 : state.post.qtdBanheiros}
        }
        case TypesCadPost.VALORALUGUEL :
        return {
            ...state,
            post : {...state.post, valorTotal : action.payload}

        }
        case TypesCadPost.VALORINDIVIDUAL: return {
            ...state,
            post : {...state.post, valorIndividual : action.payload}
        }
        case TypesCadPost.INCREMENTQUARTOS : return {
            ...state,
            post : {...state.post, qtdQuarto: state.post.qtdQuarto >= 0 ? state.post.qtdQuarto + 1 : state.post.qtdQuarto}        
        }
        case TypesCadPost.DECREMENTQUARTOS : return {
            ...state,
            post : {...state.post, qtdQuarto: state.post.qtdQuarto -1 >= 0 ? state.post.qtdQuarto - 1 : state.post.qtdQuarto}
        }
        case TypesCadPost.INCREMENTQUARTOSUITE : return {
            ...state,
            post : {...state.post, qtdQuartoSuite: state.post.qtdQuartoSuite >= 0 ? state.post.qtdQuartoSuite + 1 : state.post.qtdQuartoSuite}
        }
        case TypesCadPost.DECREMENTQUARTOSUITE : return {
            ...state,
            post : {...state.post, qtdQuartoSuite: state.post.qtdQuartoSuite -1 >= 0 ? state.post.qtdQuartoSuite - 1 : state.post.qtdQuartoSuite}
        }
        case TypesCadPost.TIPOAGUA : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                agua : state.post.comodides.agua ? false : true
                }
            }
        }
        case TypesCadPost.TIPOANIMAL : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                animais : state.post.comodides.animais ? false : true
                }
            }
        }
        case TypesCadPost.TIPOCERAMICA : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                ceramica : state.post.comodides.ceramica ? false : true
                }
            }
        }
        case TypesCadPost.TIPOENERGIA : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                energia : state.post.comodides.energia ? false : true
                }
            }
        }
        case TypesCadPost.TIPOFOGAO : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                fogao : state.post.comodides.fogao ? false : true
                }
            }
        }
        case TypesCadPost.TIPOFORRADO : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                tetoForrado : state.post.comodides.tetoForrado ? false : true
                }
            }
        }
        case TypesCadPost.TIPOGARAGEMCARRO : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                garagemC : state.post.comodides.garagemC ? false : true
                }
            }
        }
        case TypesCadPost.TIPOGARAGEMMOTO : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                garagemM : state.post.comodides.garagemM ? false : true
                }
            }
        }
        case TypesCadPost.TIPOGELADEIRA : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                geladeira : state.post.comodides.geladeira ? false : true
                }
            }
        }
        case TypesCadPost.TIPOWIFI : return {
            ...state,
            post : {
                ...state.post, comodides : {...state.post.comodides, 
                wifi : state.post.comodides.wifi ? false : true
                }
            }
        }
        case TypesCadPost.TIPOIMOVEL : return {
            ...state,
            post : {...state.post, tipoImovel : action.payload}
        }
        case TypesCadPost.SETDESCRICAO : return {
            ...state,
            post : {...state.post, descricao : action.payload}
        }
        case 'CEPERRO' : return{
            ...state,
            cepErro : action.payload
        }
        case 'CEPTRUE' : return {
            ...state,
            cepTrue : true
        }
        case 'PESQUISAATIVA' : return{
            ...state,
            pesquisaAtiva : action.payload
        }
        case 'FINDMAISPOSTS':
        return{
            ...state,
            posts : [...state.posts,...action.payload]
        }
        case Types.ALLVAGAS :
        return {
            ...state,
            posts : action.payload
        }
        break;
        case 'CLIQUE' : 
        return{
            ...state,
            click : state.click + 1
        }
        break;
        case 'CLIQUEZERO' : return{
            ...state,
            click : 0
        }
        case 'CLIQUEPOST' :return{
            ...state, 
            clickPost : state.clickPost + 1
        }
        case 'CLIQUEPOSTZERO' :return {
            ...state,
            clickPost : 0
        }
        case Types.DESCRICAOVAGA : return{
            ...state,
            post : {...state.post, descricao : action.payload}
        }
        case Types.VALUEVAGA : return{
            ...state,
            post : {...state.post, valor : action.payload}
        }
        
        case Types.CIDADESEARCH : return {
            ...state,
            cidadeSearch : action.payload
        }
        case Types.COMPARTILHADA: return {
            ...state,
            post : { ...state.post, compartilhada : action.payload}
        }
        case Types.COMPLETA: return {
            ...state,
            post : { ...state.post, completa : action.payload}
        }
        case 'MARCAR_COMO_ALUGADA' :
            const position_alu = state.posts.findIndex((item)=>item.vagaId === action.payload)
            return update(state,{
                posts:{
                    [position_alu]:{
                        disponivel : {$set : false}
                    }
                }
            })
            case 'ANUNCIAR_COMO_DISPONIVEL' :
            let position_disp = state.posts.findIndex((item)=>item.vagaId === action.payload)
            return update(state,{
                posts:{
                    [position_disp]:{
                        disponivel : {$set : true}
                    }
                }
            })
        case 'LIKE' : 
        let position = state.posts.findIndex((item)=>item.vagaId === action.payload)
        let obj = state.posts.find((item)=>item.vagaId === action.payload)
            return update(state,{
                posts:{
                    [position]:{
                        countLikes : {$set : obj.countLikes - 1},
                        favorite :{$set : true}
                    }
                }
            })
        case 'DESLIKE' : 
        let posicion = state.posts.findIndex((item)=>item.vagaId === action.payload)
        let objt = state.posts.find((item)=>item.vagaId === action.payload)
            return update(state,{
                posts:{
                    [posicion]:{
                        countLikes : {$set : objt.countLikes + 1},
                        favorite :{$set : false}
                    }
                }
            })
        case 'LOADFINDPOSTS' : return {
            ...state,
            loadPosts : action.payload
        }
        case 'LOADMAISPOSTS' : return {
            ...state,
            loadMaisPosts : action.payload
        }
        case 'LOADREGISTERPOST' : return{
            ...state,
            loadRegisterPost : action.payload
        }
        case Types.LIMPACIDADEBUSCA : return{
            ...state,
            cidadeSearch : ''
        }
        case Types.LIMPAUSERSINTERESSADOS : return {
            ...state,
            likaramPost : []
        }
        case 'LOADINTERESSADOS' : return {
            ...state,
            loadInteressados : action.payload
        }
        case Types.CIDADEVAGA : return {
            ...state,
            post : {...state.post,
                endereco : {...state.post.endereco, cidade: action.payload}}       
             }
        case Types.SETCEP : 
        return {
            ...state,
            post : {...state.post,
                    endereco : {...state.post.endereco, cep : action.payload}
            }
        }
        case 'LOADCEP' : return{
            ...state,
            loadCep : action.payload
        }
        case Types.SETRUA : return {
            ...state,
            post : {...state.post,
                endereco : {...state.post.endereco, rua : action.payload}
        }        }
        case Types.SETESTADO : return{
            ...state,
            post : {...state.post,
                endereco : {...state.post.endereco, estado : action.payload}
        }
        }
        case Types.SETBAIRRO : return {
            ...state,
            post : {...state.post,
                endereco : {...state.post.endereco, bairro : action.payload}}        
            }
        case Types.SETNUMENDERECO : 
        return {
            ...state,
            post : {...state.post,
                endereco : {...state.post.endereco, numEndereco : action.payload}}       
             }
        case Types.SETLONGLAT : return {
            ...state,
            post : {...state.post,
                ...state.post.endereco.long = action.payload.lng,
                ...state.post.endereco.lat = action.payload.lat}
        }
        case Types.SETLOADLONGLAT : return {
            ...state,
            loadLongLat : action.payload
        }
        case Types.SETCIDADECOMPARATOR : return {
            ...state,
            post : {...state.post, cidadeComparator : action.payload}
        }
        case Types.SETOPTIONSFIND : return {
            ...state,
            optionsFind : action.payload
        }
        case Types.SAVEFOTOS:
        return {
            ...state,
            post: {...state.post, images : state.post.images.concat(action.payload)},
        };
        case Types.REMOVEFOTOS:
        try {
            var im = [...state.post.images];
            var index = state.post.images.indexOf(action.payload);
            if (index > -1) {
            im.splice(index, 1);
            }
            return {
            ...state,
            post: {...state.post, images : im},
            };
        } catch (error) {
            alert(error);
        }
        case 'LIMPAPOSTSREGISTER' : 
        return {
            ...state,
            post : {...state.post}
        }
        case "POSTCADASTRADOSUCESSO" : return {
            ...state,
            postCadastradoSucesso : action.payload
        }
        case 'FILTROTYPEVAGA' :
            return {
                ...state,
                filtroTypeVaga : action.payload //evitar que aconteça o puxar mais posts do flatlist
            }
        case 'LOGOUT' : return {
            ...state,
            ...initialState
        }
        default:
            return state;
    }
  }
  export function like(vagaId){
      
      return dispatch=> {
        dispatch({type:'CLIQUE'});
          dispatch({type : 'LIKE',
          payload : vagaId})
          dispatch({type:'CLIQUEZERO'});

      }
  }
  export function deslike(vagaId){
    return dispatch=> {
        dispatch({type:'CLIQUE'});
        dispatch({type : 'DESLIKE',
        payload : vagaId})
        dispatch({type:'CLIQUEZERO'});

    }
  }
    //salva a foto tirada na camera para publicar o imóvel
    export const SavePhoto = image => {
        try {
        return {type: Types.SAVEFOTOS, payload: image};
        } catch (error) {
        alert(error);
        }
    };
    //remove fotos selecionadas para publicação do imovel ou vaga
    export const RemovePhotos = imge => {
        try {
        return {type: Types.REMOVEFOTOS, payload: imge};
        } catch (error) {
        return ;
        }
    };
 
    
    export const buscaCep = (numCep) => {
        try {
            return dispatch => {
                dispatch({type:'LOADCEP', payload: true})
                cep(numCep).then(item=>{
                    let cidadeComparate = retira_acentos(item.city);
                    let mCidadeComparate = cidadeComparate.toLowerCase();
                    dispatch({type : Types.CIDADEVAGA , payload : item.city})
                    dispatch({type : Types.SETRUA , payload : item.street})
                    dispatch({type : Types.SETBAIRRO , payload : item.neighborhood})
                    dispatch({type : Types.SETESTADO , payload : item.state})
                    dispatch({type : Types.SETCIDADECOMPARATOR, payload : mCidadeComparate})
                    dispatch({type:'LOADCEP', payload: false})
                    dispatch({type:'CEPTRUE',payload:true})
                    dispatch({type : 'CEPERRO',payload:false})
                    dispatch({type: types.SETCEPCONFIG,payload:true})
                }).catch((error)=>{
                    Alert.alert('Ops!!!','Ocorreu um erro ao tentar buscar o endereço do cep!'+error)
                    dispatch({type:'LOADCEP', payload: false})
                    dispatch({type : 'CEPERRO',payload:true})//DIZ QUE O CEP DEU ERRO
                    dispatch({type:types.SETCEPCONFIG,payload:false})

                })
            }
            
        } catch (error) {

        }
        
    }
    export const setCep = (Cep) => {
        try {
            return {type: Types.SETCEP,payload : Cep};
            
        } catch (error) {
            
        }
        
    }
    export const setLongLat = (nomeRua, numero) => {
            return dispatch => {
                try {
                    dispatch({ type: Types.SETLOADLONGLAT, payload:true});
                    Geocoder.init(GOOGLE_MAPS_APIKEY);
                    Geocoder.from(nomeRua+''+numero).then((json)=>{
                    var location = json.results[0].geometry.location;
                    dispatch({type : Types.SETLONGLAT,payload : location})
                    dispatch({type: Types.SETLOADLONGLAT, payload:false});
                }).catch((error)=>{
                    Alert.alert('Ops!!!','Ocorreu um erro ao tentar buscar a longitude e latitude!'+error)
                    dispatch({type: Types.SETLOADLONGLAT, payload:false});
                })  
                } catch (error) {
                    Alert.alert('Ops!!!','Ocorreu um erro ao tentar buscar a longitude e latitude!'+error)
                    dispatch({ type: Types.SETLOADLONGLAT, payload:false});
                }  
            }
    }
    export const setCidade = (cidade) =>{
        return dispatch=>{
            dispatch({type : Types.CIDADEVAGA,payload : cidade})
        }
    }
    export const setEstado = (estado) => {
        let es = estado.toUpperCase();
        return {
            type : Types.SETESTADO , payload : es
        }
    }
    export const setRua = (rua) =>{
        return{
            type : Types.SETRUA, payload : rua
        }
    }
    export const setNumEndereco = (num) =>{
        return{
            type : Types.SETNUMENDERECO, payload : num
        }
    }
    export const setBairro = (bairro) =>{
        return{
            type : Types.SETBAIRRO, payload : bairro
        }
    }

    export const typeVagaCompleta = (typeVaga) => {
        return {
            type : Types.COMPLETA, payload : typeVaga
        }
    }
    export const typeVagaCompartilhada = (typeVaga) => {
        return {
            type : Types.COMPARTILHADA, payload : typeVaga
        }
    }

  export const descricaoVaga = (descricao) => {
      return{
          type : Types.DESCRICAOVAGA, payload : descricao
      }
  }
  export const valueVaga = (valor) => {
    return{
        type : Types.VALUEVAGA, payload : valor
    }
}


 //limpa na view o array de user interessados , pra n ficar aparecendo os antigos users,caso aconteça
 export const limpaUsersInteressados = () => {
     return dispatch=>{
         dispatch({type : Types.LIMPAUSERSINTERESSADOS})
         dispatch({type : 'LOADINTERESSADOS', payload : true})
     }
 }


//busca e filtra os posts por cidade

//busca e retorna todas as informações dos usuários
async function finduser(idAutor){
    let refUser = await db.collection('users').doc(idAutor);
    let resul = await refUser.get()
    let response = await resul.data();
    return response.user
}
//busca e retorna as imagens das vagas
async function findImages(vagaId){  
            let refFotos = await db.collection('vagasCompartilhadas').doc(vagaId)
            .collection('images').get()
            let images = [];
            await refFotos.docs.forEach((item)=>{
                    images.push(item.data())
            })
            return images;
}

async function CountLikes(vagaId){
    try {
        let response = await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram')
        .get()
        let count = await response.size;
        return count;
    } catch (error) {
        return;
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
//retorna mais posts e concatena com os posts já buscados, utilizada para o scroll infinito
export function FindMaisPosts(vagaId,userId,city,typeVaga,typeF){
    return async dispatch=>{
        try {
            let newCity;
            if(typeF==='filterVagas'){
                newCity = retira_acentos(city);
            }
            dispatch({type:'LOADMAISPOSTS',payload : true})
            let findOutersPosts;

            typeF === 'filterVagas' ? 
            findOutersPosts = await db.collection("vagasCompartilhadas")
            .where('cidadeComparator','==',newCity)
            .where('completa','==',typeVaga).orderBy("cidadeComparator")
            .startAfter(vagaId)
            .limit(12)
            .get()  : 
            findOutersPosts = await db.collection("vagasCompartilhadas")
            .where('cidadeComparator','==',newCity)
            .where('completa','==',typeVaga).orderBy("cidadeComparator")
            .startAfter(vagaId)
            .limit(12)
            .get()
            
            let resul = await Promise.all(
            findOutersPosts.docs.map(async (doc)=>{
                let vaga =  await doc.data()
                let user = await finduser(vaga.idAutor);
                vaga.user = user;
                let images = await findImages(vaga.vagaId);
                vaga.images = images;
                let favorite = await verifyUsersFavoritaram(vaga.vagaId,userId);
                vaga.favorite = favorite;
                let countLikes = await CountLikes(vaga.vagaId);
                vaga.countLikes = countLikes;
                return vaga;
                })
                )
                dispatch({type : 'FINDMAISPOSTS',payload : resul}) //dispatch({type : 'FINDMAISPOSTS',payload : resul})
                dispatch({type:'LOADMAISPOSTS',payload : false})
        } catch (error) {
            
        }
    }       
}

//verificar se usuário favoritou post
async function verifyUsersFavoritaram(vagaId,userId){
    let find = await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram')
    .where('userId','==',userId).get()

    if(find.docs.length === 0){
        return true;
    }else{
        return false;
    }
}
export const FindPost = (vagaId) => {
    return dispatch => {
        dispatch({type : 'LOADING_POST_PERFIL',payload:true});
        const userId = firebase.auth().currentUser.uid
        try {
            async function busca(){
                const req = await db.collection('vagasCompartilhadas').where('vagaId','==',vagaId).limit(1)
                const res = await req.get()
                const data = await Promise.all(res.docs.map(async(item)=>{
                    const vaga = item.data()
                    let user = await finduser(vaga.idAutor);
                    vaga.user = user;
                    const images = await findImages(vagaId);
                    let favorite = await verifyUsersFavoritaram(vaga.vagaId,userId);
                    vaga.favorite = favorite;
                    vaga.images = images;
                    return vaga;
                }))
                dispatch({type : 'SETA_POST_PROJETO',payload : data[0]});
                dispatch({type : 'LOADING_POST_PERFIL',payload : false})
            }
            busca()
            return true;
        } catch (error) {
            dispatch({type : 'LOADING_POST_PERFIL',payload : false})
            return false;
        }
    }
}
export const FindPosts = (userId,lastItem) => {
    try {
        let find;
       return async dispatch => {
        try {
        if(lastItem){
            find = await db.collection("vagasCompartilhadas")
            .orderBy("vagaId")
            .startAfter(lastItem)
            .limit(12)
            .get()
        }else{
            dispatch({type:'LOADFINDPOSTS',payload:true})
            find = await db.collection("vagasCompartilhadas")
            .orderBy("vagaId")
            .limit(3)
            .get();
        }
        find.docs.length <= 0 ? dispatch({type : 'LOADFINDPOSTS',payload:false}) : null
        let resul = await Promise.all(
        find.docs.map(async (doc)=>{
                let vaga =  await doc.data()
                let user = await finduser(vaga.idAutor);
                vaga.user = user;
                let images = await findImages(vaga.vagaId);
                vaga.images = images;
                let favorite = await verifyUsersFavoritaram(vaga.vagaId,userId);
                vaga.favorite = favorite;
                let countLikes = await CountLikes(vaga.vagaId);
                vaga.countLikes = countLikes;
            return vaga;
        }))
       lastItem? dispatch({type : 'FINDMAISPOSTS',payload : resul}) : null
       !lastItem? dispatch({type : Types.ALLVAGAS,payload : resul}):null
        dispatch({type:'LOADFINDPOSTS',payload:false})

           } catch (error) {
               dispatch({type:'LOADFINDPOSTS',payload:false})
                alert(JSON.stringify(error))
           }
    }
    } catch (error) {
        alert(JSON.stringify(error))
        return;
    }
}   
export const Clique = () =>{
    return{
        type : 'CLIQUE'
    }
}



export const AddPhotosPost = (vagaId,fotos) => {

      return dispatch => {
          try {
            saveFoto = async (foto) => {
                let value = uuid() + Math.floor(Math.random() * (100000000000 + 1));
               let saveP = await app.storage().ref(`posts/${vagaId}`).child(value).putFile(foto.path);
               let sucess = await saveP.downloadURL
                firebase.firestore().collection('vagasCompartilhadas').doc(vagaId)
               .collection('images').doc(value).set({
                   sucess,
                   value
               })
               dispatch({type : types.NOVAFOTO,payload : {
                   sucess,
                   value
               }})
            }
          if(fotos.length > 0){
            fotos.forEach(saveFoto);
            return true;
          }else{
              return false;
          }
          
          } catch (error) {
            return false;
          };
      }
  }
  export const registerPost = (postVagaCompartilhada) => {
        return async dispatch => {
            try {
        dispatch({type : 'POSTRESERVA',payload: postVagaCompartilhada})
        dispatch({type : 'LOADREGISTERPOST',payload:true})
        let cidadeComparate = retira_acentos(postVagaCompartilhada.endereco.cidade);
        let mCidadeComparate = cidadeComparate.toLowerCase();
        postVagaCompartilhada.cidadeComparator = mCidadeComparate;
            var image = postVagaCompartilhada.images
            postVagaCompartilhada.images = []
            dispatch({type : 'SETFOTORESERVA',payload : image})
            let save = await db.collection('vagasCompartilhadas')
            .add(postVagaCompartilhada)

            var resul = await save.get();

            await firebase.firestore().collection('vagasCompartilhadas')
            .doc(resul.id).set({
                ...postVagaCompartilhada,
                vagaId : resul.id
            })//salvando o ID da vaga
            savePhoto = async (foto) => {
                let value = uuid() + Math.floor(Math.random() * (100000000000 + 1));
            
               let saveP = await app.storage().ref(`posts/${resul.id}`).child(value).putFile(foto.path);
               
               let sucess = await saveP.downloadURL
               await firebase.firestore().collection('vagasCompartilhadas').doc(resul.id)
               .collection('images').doc(value).set({
                   sucess,
                   value
               })
            }
            dispatch({type:TypesCadPost.POSTEDPOST,payload :true});
            if(image.length > 0){
                await image.forEach(savePhoto);
                
            }else{
                dispatch({type : 'LOADREGISTERPOST',payload:false})
            }
            await db.collection('myPostsPublicados')
            .doc(postVagaCompartilhada.idAutor).collection('posts').doc(resul.id).set({vagaId : resul.id});
            let cidadeComparator = postVagaCompartilhada.cidadeComparator;
            let estado = postVagaCompartilhada.endereco.estado
            let cidade = postVagaCompartilhada.endereco.cidade
            await db.collection('filterNames').doc(cidadeComparator).set({
                cidadeComparator, //cidade para comparação
                cidade, //nome real da cidade
                estado // nome do estado
            })//adiciona o nome da cidade no filtro
            dispatch({type : 'LOADREGISTERPOST',payload:false})
            dispatch({type : "POSTCADASTRADOSUCESSO",payload : true})
            Toast.show('Publicado com sucesso!');
            return true;
            } catch (error) {
                dispatch({type:TypesCadPost.POSTEDPOST,payload :false});
                dispatch({type : 'LOADREGISTERPOST',payload:false})
            }
        }
} 
