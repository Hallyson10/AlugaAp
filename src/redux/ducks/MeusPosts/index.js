
import types from "./Types"
import firebase from '../../../Service/index'
const db = firebase.firestore();
const initialState = {
    posts :[],
    novasImagens : [],
    novaImage : null,
    cep : true
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
      case types.FINDMYPOSTS: return {
        ...state,
        posts : action.payload
      }
      case types.ADDNOVASIMAGENS : return {
          ...state,
          novasImagens : [...action.payload]
      }
      case types.NOVAFOTO : return {
          ...state,
            novaImage : action.payload
      }
      case types.REMOVENOVAFOTO : return {
          ...state,
          novaImage : null
      }
      case types.SETCEPCONFIG : return {
          ...state,
          cep : action.payload
      }
      
      default :
      return state;
    }

}
// async function buscaImagePost(vagaId){
//     try {
//         let ref = await db.collection('vagasCompartilhadas').doc(res.data().vagaId)
//                              .collection('images').limit(1).get();
//             const image = {}
//             await ref.docs.forEach((resImage)=>{
//                 image = resImage.data()
//             }
//             );                    
//         return image;             
//     } catch (error) {
//         return {}
//     }
// }
async function buscaPosts(vagaId){
    try {
        let ref = await db.collection('vagasCompartilhadas').doc(vagaId).get()
        let image = await db.collection('vagasCompartilhadas').doc(vagaId).collection('images').get();
        await image.docs.map((images)=>{
            ref.data().images.push(images.data());
        })
        return ref.data();
    } catch (error) {
        alert(error)
    }
}
export function buscaMeusPosts(userId){
        return dispatch => {
            try {
                async function busca(){
                    let refIdsPosts = await db.collection('myPostsPublicados')
                    .doc(userId).collection('posts').get();
                
                    let Posts = await Promise.all(refIdsPosts.docs.map(async(snapshot)=>{
                        let post = await buscaPosts(snapshot.data().vagaId);
                        return post;
                    }))
                   dispatch({type : types.FINDMYPOSTS,payload : Posts})
                }
                busca();
            } catch (error) {
                alert(error)
            }
           
        }
}

export const removeMyPost = (postId,userId) => {
    try {
        return async dispatch => {
            let ref = await db.collection('myPostsPublicados')
            .doc(userId).collection('posts').doc(postId).delete();
            console.log(postId + ' removido com sucesso!')
        }
        
    } catch (error) {
        alert(error)
    }
}
export function RemoveFoto(vagaId,fotoId){
    return dispatch => {
        try {
            async function remove(){
            await db.collection('vagasCompartilhadas').doc(vagaId).collection('images').doc(fotoId).delete();
            await firebase.app().storage().ref(`posts/${vagaId}`).child(fotoId).delete();
            }
            remove()
            alert('removida com sucesso!')
        } catch (error) {
            alert('ocorreu um erro ao tentar remover foto!');
        }
    }
}
export function addNovasFotos(postId,foto){
    return dispatch => {
        try {
            dispatch({type : types.ADDNOVASIMAGENS,payload : foto});
        } catch (error) {
            
        }
    }
}
export function RemoveNovaFoto(){
    return dispatch => {
        dispatch({type : types.REMOVENOVAFOTO});
    }
}
export function setEndereco(endereco){
    return dispatch => {
        dispatch({type : types.SETENDERECO, payload: endereco})
    }
}
export function MarcarComoAlugada(vagaId){
    return dispatch => {
        dispatch({type : 'MARCAR_COMO_ALUGADA',payload : vagaId})//marcando nos posts da linha do tempo como alugada
    }
}
export function MarcarComoDisponivel(vagaId){
    return dispatch => {
        dispatch({type : 'ANUNCIAR_COMO_DISPONIVEL',payload : vagaId})
    }
}