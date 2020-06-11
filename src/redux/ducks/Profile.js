import { Types } from '../types/index'
import firebase from '../../Service/index'
const db = firebase.firestore();
import uuid from 'uuid-random';
import TypesConfig from '../ducks/Configuracoes/TypesConfig'
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
        telefone : '',
        dataNascimento : {
          dia : '',
          mes : '',
          ano : ''
        },
        escolaridade : '',
        sexo : '',
        qtdBuscas:0,
        createAt : new Date().toUTCString(),
        idade : 0,
        receiveNotification : true,
        pacotes : {premmium : true, master : true},
        statusOnline : false,
        premium : false,
        premmiumMaster : false,
        isBloqueado : false,
        fotos : [],
        fotosPerfil : {uri:'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'}
    },
    emailEnviado : false,
    emailVerified : false
  };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'EMAIL_ENVIADO' : 
        return {
            ...state,
            emailEnviado : action.payload
        }
        case 'EMAIL_VERIFIED' : return {
            ...state,
            emailVerified : action.payload
        }
        case Types.SETUSER :
             return{
            ...state,
            user : action.payload
        }
        case Types.LOGOUT : return {
            ...state,
            ...initialState
        }
        case Types.SELECIONAFOTO : return {
            ...state,
            user : {...state.user, fotosPerfil: action.payload}
        }
        case Types.DESCRICAOPESSOAL : 
        return {
            ...state,
            user : {...state.user, descricaoPessoal : action.payload}
        }
        case TypesConfig.SETNOME : return {
            ...state,
            user : {...state.user, username : action.payload}
        }
        case TypesConfig.SETESCOLARIDADE : return {
            ...state,
            user : {...state.user, escolaridade : action.payload}
        }
        case TypesConfig.SETCIDADENATAL : return {
            ...state,
            user : {...state.user, cidadeNatal : action.payload}
        }
        case TypesConfig.SETDATANASCIMENTO : return {
            ...state,
            user : { ...state.user, dataNascimento : action.payload}
        }
        case TypesConfig.SETIDADE : return {
            ...state,
            user : {...state.user, idade : action.payload}
        }
        case TypesConfig.SETSEXO : return {
            ...state,
            user : { ...state.user, sexo : action.payload}
        }
        case TypesConfig.SETEMAIL :return {
            ...state,
            user : { ...state.user, email : action.payload}
        }
        case TypesConfig.SETSENHA : return {
            ...state,
            user : { ...state.user, password : action.payload}
        }
        case TypesConfig.SETLINKINSTAGRAM : return {
            ...state,
            user : {...state.user,linkInstagram : action.payload}
        }
        case TypesConfig.SETLINKFACEBOOK : return {
            ...state,
            user : {...state.user, linkFacebook : action.payload}
        }
        case TypesConfig.NUMBERLIVRE : return {
            ...state,
            user : {...state.user, numberLivre : action.payload}
        }
        case TypesConfig.DESFAZCONFIGUSER: return {
            ...state,
            user : {...state.user, 
            username : action.payload.username,
            cidadeNatal : action.payload.cidadeNatal,
            idade : action.payload.idade,
            sexo : action.payload.sexo,
            dataNascimento : action.payload.dataNascimento,
            escolaridade : action.payload.escolaridade,
            email : action.payload.email,
            password : action.payload.password,
            linkFacebook : action.payload.linkFacebook,
            linkInstagram : action.payload.linkInstagram
            }
        }

        default:
        return state;
    }   
}

export const setUser = (user) => {
    return dispatch => {
        try {
            dispatch({type : Types.SETUSER , payload : user});
            dispatch({type:Types.SETFOTOTEMP, payload : user.fotosPerfil})//seta a foto de edição
            dispatch({type:Types.SETUSERPROFILE , payload : user})
            return;
        } catch (error) {
            console.log('ERRO SETPROFILE '+error)
        }
        
    }
}
export function desativaModalEmailEnviado(){
    return {
        type : 'EMAIL_ENVIADO',payload : false
    }
}
export function ativaModalEmailEnviado(){
    return {
        type : 'EMAIL_ENVIADO',payload : true
    }
}
export function desativaModalVerificaEmail(){
    return {
        type : 'EMAIL_VERIFIED',
        payload : false
    }
}
export function ativaModalEmailVerificado(){
    return{
        type : 'EMAIL_VERIFIED',payload : true
    }
}
export function EnviarEmailVerification(){
    return dispatch => {
        try {
            async function send(){
            await firebase.auth().currentUser.sendEmailVerification();
            dispatch({type : 'EMAIL_VERIFIED',payload : false})
            dispatch({type : 'EMAIL_ENVIADO',payload : true})
            }
            send();
        } catch (error) {
            dispatch({type : 'EMAIL_ENVIADO',payload : false})
            dispatch({type : 'EMAIL_VERIFIED',payload : false})
        }
    }
}