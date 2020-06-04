import { Types } from '../types/index'
import firebase from '../../Service/index'
import uuid from 'uuid-random';
const db = firebase.firestore();
const { app } = firebase.storage();
import axios from 'axios'

import moment from 'moment'
const initialState = {
    user : {
        authType : '',
        userId : '',
        tokenId : '',
        tokenNotification : '',
        username : '',
        email : '',
        password : '',
        descricaoPessoal:'',
        phone : '',
        dataNascimento : {
          dia : '',
          mes : '',
          ano : ''
        },
        escolaridade : 'Outros',
        cidadeNatal : '',
        sexo : '',
        qtdBuscas : 0,
        createAt : new Date().toUTCString(),
        idade : 0,
        receiveNotification : true,
        pacotes : {premmium : false, master : false},
        statusOnline : false,
        isBloqueado : false,
        fotos : [],
        fotosPerfil : {uri:''},
        numberLivre : false
    },
    errosCad : {},
    cadSucesso : false,
    codigoVerificacao : '',
    verificado : '',
    loadingRegister : false,
    loadingSendCode : false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case Types.LOADINGREGISTER : return {
        ...state,
        loadingRegister : action.payload
      }
      case Types.LOADINGSENDCODE : return {
        ...state,
        loadingSendCode : action.payload
      }
      case Types.USERID : return{
        ...state,
        user : {...state.user, userId : action.payload}
      }
     case Types.NEWUSERNAME : return{
         ...state,
         user : {...state.user, username : action.payload},
         errosCad : {...state.errosCad, username :''}
     }
     case Types.NEWEMAIL : return {
         ...state,
         user : {...state.user, email : action.payload},
         errosCad : {...state.errosCad, email :''}
     }
     case Types.NEWPASSWORD : return {
         ...state,
         user : {...state.user, password : action.payload},
         errosCad : {...state.errosCad, passwordCad :''}
     }
     case Types.NEWTELEFONE : return {
        ...state,
        user : {...state.user, phone : action.payload},
        errosCad : {...state.errosCad, telefone :''}
    }
    case Types.NEWDATANASCIMENTO : return {
        ...state,
        user : {...state.user, dataNascimento : action.payload},
        errosCad : {...state.errosCad, dataNascimento :''}
    }
    case Types.NEWESCOLARIDADE : return {
        ...state,
        user : {...state.user, escolaridade : action.payload}
    }
    case Types.NEWSEXO : return {
        ...state,
        user : {...state.user, sexo : action.payload}
    }
    case Types.SETCIDADENATAL : return {
      ...state,
      user : { ...state.user, cidadeNatal : action.payload}
    }
    case Types.NEWFOTO : return {
        ...state,
        user : {...state.user, fotos : action.payload}
    }
    case Types.NEWIDADE : return {
      ...state,
      user : { ...state.user , idade : action.payload}
    }
    case Types.SELECIONAFOTO : return {
      ...state,
      user : {...state.user,fotosPerfil : action.payload}
    }
    case Types.ERROSCAD : return {
        ...state,
        errosCad : action.payload
    }
    case Types.LOGOUT : return {
      ...state,
      ...initialState
    }
    case Types.CADSUCESSO : return {
        ...state,
        cadSucesso : true
    }
    case Types.CODIGOVERIFICADO : return {
      ...state,
      verificado : action.payload.verificado,
      codigoVerificacao : action.payload.codigoVerificacao
    }
      default:
        return state;
    }
}

export const setUsername = (nome) => {
    
    try {
      return dispatch => {
       dispatch({type : Types.NEWUSERNAME, payload : nome})
      }
    } catch (error) {
      console.log(error)
    }
}

  export const setEmail = (email) => {
    try {
      return dispatch => {
        dispatch({type : Types.NEWEMAIL, payload : email})
      }
    } catch (error) {
      console.log(error);
    }
  }
  export const setSenha = (password) => {
    try {
      return dispatch => {
        dispatch({type : Types.NEWPASSWORD, payload : password})
      }
    } catch (error) {
      console.log(error);
    }
  }

  export const setPhone = (phone) => {
    try {
      return dispatch => {
        dispatch({type : Types.NEWTELEFONE, payload : phone})
      }
    } catch (error) {
      
    }
  }
  export const setEscolaridade = (escolaridade) => {
    try {
      return {
        type : Types.NEWESCOLARIDADE, payload : escolaridade
      }
    } catch (error) {
      
    }
  }
  export function setCidadeNatal(cidade){
      try {
        return dispatch => {
          dispatch({type : Types.SETCIDADENATAL ,payload : cidade})
        }
      } catch (error) {
        
      }
  }

  export const NewSexo = (sexo) => {
    try {
      return {
        type : Types.NEWSEXO, payload : sexo
      }
    } catch (error) {
      
    }
  }
  export const NewIdadeUser = (idade) => {
    try {
      return dispatch => {
        dispatch({
        type : Types.NEWIDADE, payload : idade
      })}
      
    } catch (error) {
      
    }
  }

  export const NewDataNascimento = (data) => {
    try {
      return dispatch =>{
        dispatch({type : Types.NEWDATANASCIMENTO, payload : data})
      }
    } catch (error) {
      
    }
  }

  export const selecionaFotos = (imagem) =>{
    return dispatch => {
      dispatch ({type : Types.SELECIONAFOTO, payload : ''})
      dispatch ({type : Types.SELECIONAFOTO,payload : imagem})
      dispatch({type:TypesConfig.SETEDITFOTO,payload : true})
      }
       
  }

  export const AddPhotosAlbum = (idUser,fotos) => {
    try {
      return async dispatch => {
          try {
            if(fotos.lenght > 0){
              fotos.forEach(save);
            }else{
                console.log('selecione uma imagem')
            }
          save = async (foto) => {
            let chave = firebase.database().ref().push();
            let save = await app.storage().ref(`users/profile${idUser}`).child().putFile(foto);
            let sucess = await save.downloadURL
            let refSaveProfile = await firebase.firestore().collection('users').doc(idUser).set({
              fotos : sucess
            })
            console.log(save);
          }
          
          } catch (error) {
            alert('você está sem internet')
          };
      }
    } catch (error) {
      
    }
  }
  const isEmpty = (string) => {
    if(string.trim() === '') return true;
    return false;
  }

  const isEmail = (email) => {
    let verifica = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(email.match(verifica)) return true;
     return false;
  }
 
  export function updateNumber(idUser,number){//atualiza o numero do usuário 
      return dispatch =>{
        try {
          dispatch({type:Types.LOADINGSENDCODE,payload:true})
          async function update(){
            await db.collection('users').doc(idUser).update({
              "user.phone" : number,
              "user.phoneVerificado" : true
            })
          }
          update();
          dispatch({type:Types.LOADINGSENDCODE,payload:false})
        } catch (error) {
          dispatch({type:Types.LOADINGSENDCODE,payload:false})
        }
      }
  }

  export const RegisterUser = (user) => {
    try {
      return async dispatch => {
        dispatch({type:Types.LOADINGREGISTER,payload:true})
          const { email , password} = user;
          await firebase.auth().createUserWithEmailAndPassword(email,password).catch((error)=>{
            if(error.code === 'auth/invalid-email') errors.email = 'Email inválido!';
            if(error.code === 'auth/email-already-in-use') errors.email = 'Email já existente!'
            if(Object.keys(errors).length > 0) dispatch({type : Types.ERROSCAD , payload : errors});
            return true;
          }).then(async(usuario)=>{
            user.userId = usuario.user.uid;
            let token = ''
                // Set the current token if it exists
                await firebase.messaging().getToken()
                    .then((fcmToken) => {
                        if (fcmToken) {
                            token = fcmToken
                            user.tokenNotification = token;
                        }
                    }).catch((err) => null);
                await db.collection('users').doc(user.userId).set({
                  user
                })
                await firebase.auth().currentUser.sendEmailVerification();
                let item = user.fotosPerfil;
                let value = uuid()+item.path;
                let saveP = await app.storage().ref(`users/`).child(value).putFile(item.path);
                let image = {}
                image.uri = await saveP.downloadURL
                image.ref = await saveP.ref
                let refSaveProfile = await firebase.firestore().collection('users').doc(user.userId)
                await refSaveProfile.update({
                 user :{...user,fotosPerfil: image}
                })
                return true;
          }).catch((error)=>dispatch({type:Types.LOADINGREGISTER,payload:false})
          )
          dispatch({type:TypesConfig.SETEDITFOTO,payload : false})
                dispatch({type : 'EMAIL_ENVIADO',payload : true})
          dispatch({type:Types.LOADINGREGISTER,payload:false})
          return true;
      }
    } catch (error) {
      dispatch({type:Types.LOADINGREGISTER,payload:false})
    }
  }

async function sendCodigo(phone,repeat,codigoVerificacao){
      try {
        if(repeat){//verificar se o codigo já é existente e quer repetir o reenvio
          let promise = new Promise((resolve, reject) => {
            axios({
              url : 'confirmarNumber',
              baseURL : 'https://us-central1-aplu-d36af.cloudfunctions.net',
              method : 'POST',
              data : {
                to : phone,
                cod : codigoVerificacao
            }
          }).then((res)=>{
             return resolve(res.data);
          }).catch((error)=>{throw new UserException("Deu ruim, no envio de código de verificação!")})
          });
          let result = await promise;
          return result
        }
        else{
          let promise = new Promise((resolve, reject)=>{
            axios({
              url : 'confirmarNumber',
              baseURL : 'https://us-central1-aplu-d36af.cloudfunctions.net',
              method : 'POST',
              data : {
                  to : phone
              }
          }).then((res)=>{
            return resolve(res.data)
          })
          .catch((error)=>{throw new UserException("Deu ruim, no envio de código de verificação!")})
          })
          let result = await promise;
          return result
          }
        
      } catch (error) {
        alert('Ocorreu um erro inesperado, tente novamente!')
      }
    
  }
  export function verifyNumber(phone,repeat,codigo){
      return dispatch => {
        try {
          dispatch({type:Types.LOADINGSENDCODE,payload:true})
        if(codigo){
          var newCod = codigo.toLowerCase();
        }
        async function verify(){
          let response = await db.collection('telefones').doc(phone).get()
          let exists = await response.data()
          let resultado = await response.data()
          if(exists && repeat){
              let responseSend = await sendCodigo(phone,true,resultado.codigoVerificacao); 
              let responseSendCodigo = await responseSend //objeto retornado
              if(responseSendCodigo){
                dispatch({type : Types.CODIGOVERIFICADO,payload : {
                  verificado : responseSendCodigo.verificado, //apenas no front diz que já foi enviado
                  codigoVerificacao : responseSendCodigo.codigoVerificacao.toLowerCase()
                }})
              }
          }else if(exists){
            dispatch({type : Types.CODIGOVERIFICADO,payload : {
              verificado : 'pendente', //apenas no front diz que já foi enviado
              codigoVerificacao : resultado.codigoVerificacao.toLowerCase()
            }})
            
            if(resultado.codigoVerificacao.toLowerCase() === newCod){
              dispatch({type : Types.CODIGOVERIFICADO,payload : {
                verificado : 'ok',
              }})
            }else{
            }
          }else if(!exists && !repeat){
            let responseSend = await sendCodigo(phone,false);
            let responseSendCodigo = await responseSend //objeto retornado
            if(responseSendCodigo){
              dispatch({type : Types.CODIGOVERIFICADO,payload : {
                verificado : responseSendCodigo.verificado, //apenas no front diz que já foi enviado
                codigoVerificacao : responseSendCodigo.codigoVerificacao.toLowerCase()
              }})
            }
          }

        }
        verify();
        dispatch({type:Types.LOADINGSENDCODE,payload:false})
        } catch (error) {
          dispatch({type:Types.LOADINGSENDCODE,payload:false})
        }
      }
  }