import firebase from '../../../Service/index'
const bd = firebase.app().firestore();
const { app } = firebase.storage();
import uuid from 'uuid-random';
import {Types} from '../../types/index'
import TypesConfig from './TypesConfig'
const initialState = {
    user : {},
    fotoTemp : [{uri:''}], //salva a foto old,
    editFoto : false,
    tabConfig : false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SETUSERPROFILE : return {
            ...state,
            user : action.payload
        }
        case Types.SETFOTOTEMP : return {//seta a foto temporaria old
            ...state,
            fotoTemp : action.payload
        }
        case TypesConfig.SETEDITFOTO : return {
            ...state,
            editFoto : action.payload
        }
        case TypesConfig.SETTABCONFIG : return {
            ...state,
            tabConfig : action.payload
        }
        
        default:
            return state;
    }
}

export function desfazConfig(user){
        return dispatch => {
            dispatch({type : TypesConfig.DESFAZCONFIGUSER, payload : user})
        }
}
export function setTabConfigAtiva(){
    return {
        type : TypesConfig.SETTABCONFIG,
        payload : true
    }
}
export function setTabConfigDesativa(){
    return {
        type : TypesConfig.SETTABCONFIG,
        payload : false
    }
}
export function setUsername(nome){
    return {
        type : TypesConfig.SETNOME,payload : nome
    }
}
export function setEmail(email){
    return {
        type : TypesConfig.SETEMAIL ,payload:email
    }
}
export function setSenha(senha){
    return {
        type : TypesConfig.SETSENHA, payload : senha
    }
}
export function setCidadeNatal(cidade){
    return {
        type : TypesConfig.SETCIDADENATAL,payload : cidade
    }
}
export function setEscolaridade(escolaridade){
    return dispatch => {
        dispatch({type : TypesConfig.SETESCOLARIDADE ,payload : escolaridade})
    }
}
export function setDataNascimento(data){
    return dispatch => {
        try {
        dispatch({type : TypesConfig.SETDATANASCIMENTO,payload : data})
        } catch (error) {
            return false;
        }
    }
}
export function setIdade(idade){
    return dispatch => {
       dispatch ({type : TypesConfig.SETIDADE ,payload : idade})
    }
}
export function setSexo(sexo){
        return {
            type : TypesConfig.SETSEXO,payload : sexo
        }
}
export function setLinkInstagram(nome){
    return {
        type :  TypesConfig.SETLINKINSTAGRAM,payload : nome
    }
}
export function setLinkFacebook(nome){
    return {
        type : TypesConfig.SETLINKFACEBOOK,payload : nome 
    }
}
export function CancelarFoto(image){
    return dispatch => {
        dispatch({type:Types.SELECIONAFOTO,payload:{uri:''}})
        dispatch({type:Types.SELECIONAFOTO,payload:image})
        dispatch({type:TypesConfig.SETEDITFOTO,payload : false})
    }
}
export function AlterarFoto(userId,newFoto,oldFoto){
    return dispatch => {
        try {
            async function updateFoto(){
                let value = uuid() + newFoto.path;
                //salvando a foto
                let saveP = await app.storage().ref(`users/`).child(value).putFile(newFoto.path)
                let image = {}
                image.uri = await saveP.downloadURL //uri da imagem
                image.ref = await saveP.ref //referencia
                //update da nova foto no banco
                let refSaveProfile = await firebase.firestore().collection('users').doc(userId)
                await refSaveProfile.update({
                 "user.fotosPerfil" : image
                })
                //excluindo foto anterior
                await app.storage().ref(oldFoto.ref).delete();
            }
            updateFoto();
            dispatch({type:Types.SETFOTOTEMP, payload : newFoto})
            dispatch({type:TypesConfig.SETEDITFOTO,payload : false})
            return true;
        } catch (error) {
            console.log(error);
            alert(JSON.stringify(error))
            return false;
        }}
}
export function AlterarInfBasicas(informacoes){//ok
    return dispatch => {
    try {
        async function update(){
            await bd.collection('users').doc(informacoes.userId).update({
                "user.username" : informacoes.username,
                "user.idade" : informacoes.idade,
                "user.escolaridade" : informacoes.escolaridade,
                "user.cidadeNatal" : informacoes.cidadeNatal,
                "user.dataNascimento" : informacoes.dataNascimento,
                "user.linkFacebook" : informacoes.linkFacebook,
                "user.linkInstagram" : informacoes.linkInstagram,
            });
        }
        update();
        dispatch({type : Types.SETUSERPROFILE, payload : informacoes});
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
        }
}

export function DescricaoPessoal(descricao){
    return dispatch => {
            dispatch({type:Types.DESCRICAOPESSOAL,payload:descricao})
    }
}
export function AlterarDescricao(userId,descricao){
    return dispatch => {
        try {
            async function updateDes(){
                try {
                     await bd.collection('users').doc(userId).update({
                        "user.descricaoPessoal" : descricao
                    })
                } catch (error) {
                    dispatch({type : 'EMAIL_VERIFIED',
                    payload : true})
                    return false;  
                }
        }
            updateDes();
        return true;
        } catch (error) {
            alert(error)
            return false;
        }
    }
}
export function numberLivre(userId){
    return dispatch => {
        try {
            async function updateTel(){
                await bd.collection('users').doc(userId).update({
                "user.numberLivre" : true
            })
        }
            updateTel();
            dispatch({type:TypesConfig.NUMBERLIVRE,payload:true})
        } catch (error) {
            return false;
        }
    }
}
export function numberPrivado(userId){
    return dispatch => {
        try {
            async function updateTel(){
                await bd.collection('users').doc(userId).update({
                "user.numberLivre" : false
            })
        }
            updateTel();
            dispatch({type:TypesConfig.NUMBERLIVRE,payload:false})
        } catch (error) {
            return false;
        }
    }
}

export function AlterarEmail(email){//ok
    var user = firebase.auth().currentUser;
    user.updateEmail(email).then(function() {
      return true;
    }).catch(function(error) {
      return false
    });
}
export function AlterarSenha(){//ok
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function() {
    return true;
    }).catch(function(error) {
    return false;
    });
}

export function RecuperarSenha(email){//ok
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      return true;
    }).catch(function(error) {
      return false;
    });
}
export function VerificarEmail(){//ok
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        return true;
    }).catch(function(error) {
        return false;
    });
}

export function ExcluirConta(){//ok
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
    return true;
    }).catch(function(error) {
    return true;
    });
}