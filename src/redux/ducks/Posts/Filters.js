import {Types} from '../../types/index'
import firebase from '../../../Service/index'
const db = firebase.firestore();

const initialState = {
    compartilhada : false,
    completa : false,
    masculino : false,
    feminino : false,
    type : false
}

export default function reducer(state = initialState, action) {
      switch (action.type) {
          case 'SELECTTYPECOMPARTILHADA':
              return{
                  ...state,
                  completa: false,
                  compartilhada : true
              }
              case 'SELECTTYPECOMPLETA':
              return{
                  ...state,
                  completa: true,
                  compartilhada : false
              }
              case 'SELECTTYPEMASCULINO' : return {
                  ...state,
                  feminino : false,
                  masculino : true
              }
              case 'SELECTTYPEFEMININO': return {
                  ...state,
                  feminino : true,
                  masculino : false
              }
              case 'MODIFICATYPEFILTER' : return {
                  ...state,
                  type : action.payload
              }
              case 'LIMPAFILTER' : 
              return {
                ...state,
                compartilhada : false,
                completa : false,
                masculino : false,
                feminino : false,
                type : false
              }
              break;
      
          default:
              return state;
      }
  }

  export function LimpaFiltroPeople(){
      return{
          type : 'LIMPAFILTER'
      }
  }

export function SelectTypeMasculino(){
    return {
        type : 'SELECTTYPEMASCULINO'
    }
}
export function SelectTypeFeminino(){
    return{
        type : 'SELECTTYPEFEMININO'
    }
}
export function SelectType(value){
    return {
        type : 'MODIFICATYPEFILTER',
        payload : value
    }
}
  export function SelectTypeVagaCompleta(){
        return{
            type : 'SELECTTYPECOMPLETA'
        }
  }
  export function SelectTypeVagaCompartilhada(){
    return{
        type : 'SELECTTYPECOMPARTILHADA'
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
 export function ativaPesquisa(value){
    return{
        type : 'PESQUISAATIVA',
        payload : value
    }
}
   //altera o valor do input
   export const searchCidade = (cidade) => {
    return{
        type : Types.CIDADESEARCH, payload : cidade
    }   
}
export const limpaCidadeBusca = () => {
    return {
        type : Types.LIMPACIDADEBUSCA
    }
}
async function finduser(idAutor){
    console.log('entrou no busca autor')
    let refUser = await db.collection('users').doc(idAutor)
    let resul = await refUser.get()
    let response = await resul.data();
    return response.user
}
//busca e retorna as imagens das vagas
async function findImages(vagaId){  
    console.log('entrou na busca imagens');
    let refFotos = await db.collection('vagasCompartilhadas').doc(vagaId)
    .collection('images').get()
    let images = [];
    await refFotos.docs.forEach((item)=>{
            images.push(item.data())
    })
    return images;
}
async function verifyUsersFavoritaram(vagaId,userId){
    let find = await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram')
    .where('userId','==',userId).get()

    if(find.docs.length === 0){
        return true;
    }else{
        return false;
    }
}
async function CountLikes(vagaId){
    try {
        let response = await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram')
        .get()
        let count = await response.size;
        console.log('imprimindo o valor do countLikes', count)
        return count;
    } catch (error) {
        console.log(error)
    }
}
export const FilterPosts = (cidade,userId,typeVaga,type) => {
    try {
        let city = retira_acentos(cidade);
        let mCidade = city.toLowerCase();
        return async dispatch => {
            dispatch({type : 'LOADFINDPOSTS',payload:true})
            //type === 'filterVagas' ? dispatch({type:'FILTROTYPEVAGA',payload: true}) : null
            let referenciaDeBuscaVagasFilter;

            type === 'filterVagas' ? 
            referenciaDeBuscaVagasFilter = await db.collection("vagasCompartilhadas")
            .where('cidadeComparator','==',mCidade)
            .where('completa','==',typeVaga).limit(5)
            .get() 
            :
            referenciaDeBuscaVagasFilter = await db.collection("vagasCompartilhadas")
            .orderBy('cidadeComparator')
            .startAt(mCidade)
            .endAt(mCidade).limit(5).get()

            let respostaDaBuscaCidade = await referenciaDeBuscaVagasFilter.docs
            respostaDaBuscaCidade.length <= 0 ? dispatch({type : Types.ALLVAGAS,payload : []}) : null
            respostaDaBuscaCidade.length <= 0 ? dispatch({type : 'LOADFINDPOSTS',payload:false}) : null

            let arrayDeRespostas = await 
            Promise.all(
            respostaDaBuscaCidade.map(async(query)=>{
                let vaga = await query.data();
                try {
                    let user = await finduser(vaga.idAutor);
                    vaga.user = user;
                    let images = await findImages(query.id);
                    vaga.images = images;
                    let favorite = await verifyUsersFavoritaram(vaga.vagaId,userId);
                    vaga.favorite = favorite;
                    let countLikes = await CountLikes(vaga.vagaId);
                    vaga.countLikes = countLikes;
                     return vaga;
                } catch (error) {
                    alert(error);
                }
            }))
            dispatch({type : Types.ALLVAGAS,payload : arrayDeRespostas})
            dispatch({type:'LOADFINDPOSTS',payload:false})
        }
        
    } catch (error) {
        dispatch({type:'LOADFINDPOSTS',payload:false})
        alert(error)
    }
}

//retorna os nomes de cidades para dar sugestão de pesquisa pro usuário
export const FilterNamePosts = (cidade) => {
    console.log(cidade)
    return async dispatch => {
        try {
            let city = retira_acentos(cidade);
            let mCidade = city.toLowerCase();
            console.log(mCidade)
            //referencia pra cidade
            let citys = await db.collection('filterNames').orderBy('cidadeComparator').startAt(mCidade)
           .get()
            let response = await citys.docs.map(item => {
                console.log(item.data())
                return item.data()
            })
            var namesCidades = response.filter((este, i) => response.indexOf(este) === i);
            dispatch({type : Types.SETOPTIONSFIND, payload : namesCidades})
        } catch (error) {
            alert(error);
        }
    }
}