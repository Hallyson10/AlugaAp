import { Types } from '../types/index'
import firebase from '../../Service/index'
import { AsyncStorage } from 'react-native'
const initialState = {
    isLogged: false,
    token: null,
    user: {},
    userId:'',
    email : '',
    password : '',
    erroAuth : {},
    loadingAuth : false,
  };
  
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case Types.EMAIL: return {
        ...state,
        email : action.payload,
        erroAuth : {...state.erroAuth,email:''}
      }
      case Types.PASSWORD: return {
        ...state,
        password : action.payload,
        erroAuth : {...state.erroAuth,password:''}
      }
      case Types.AUTH: 
      return {
        ...state,
        isLogged : true,
        userId: action.payload
      }
      break;
      case Types.LOADINGAUTH: 
      return {
        ...state,
        loadingAuth : action.payload
      }
      case Types.ERROAUTH:
      return {
        ...state,
        erroAuth : action.payload
      }
      case Types.LOGOUT:
        return {
          ...state,
          ...initialState
        };
      default:
        return state;
    }
}

//actions



export const Email = (email) => {
  try {
    return {
      type : Types.EMAIL, payload : email
    }
  } catch (error) {
    
  }
}
export const Password = (password) => {
  try {
    return dispatch => {
      dispatch({type : Types.PASSWORD, payload : password});
    }
  } catch (error) {
    
  }
  
}

const isEmail = (email) => {
  let verifica = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if(email.match(verifica)) return true;
  return false;
}
const isEmpty = (string) => {
  if(string.trim() === '') return true;
  return false;
}


export const Login = (email, password) => {
  try {
   
  var ErrorsLogin = {};
  if(isEmpty(email) || !isEmail(email)) ErrorsLogin.email = 'Digite um email válido';
  if(isEmpty(password) || password.length < 6) ErrorsLogin.password = 'Minímo permitido 6 caracteres';

  if(Object.keys(ErrorsLogin).length > 0) return {type : Types.ERROAUTH, payload : ErrorsLogin};

    
      return async dispatch => {

      dispatch({type: Types.LOADINGAUTH , payload : true})
       await firebase.auth().signInWithEmailAndPassword(email, password).catch((error)=>{
        if(error.code === 'auth/user-not-found') ErrorsLogin.email = 'Ops,email inexistente!'  
        if(error.code === 'auth/wrong-password') ErrorsLogin.password = 'Ops, senha incorreta!'
        if(error.code === 'auth/unknown') ErrorsLogin.ErrorDesconhecido = 'Ocorreu um erro, verifique sua internet!'
        if(Object.keys(ErrorsLogin).length > 0) dispatch({type : Types.ERROAUTH, payload : ErrorsLogin});
        console.log(error.code);
        return false;
      }).then((usuario)=> {
        dispatch({type: Types.LOADINGAUTH , payload : false})
        //dispatch({type: Types.AUTH,payload : user.user.uid});
      })
      }
    } catch (error) {
      alert('ocorreu um erro inexperado, verifique sua internet!')
      dispatch({type: Types.LOADINGAUTH,payload : false})
    }
  
}
export const isAuth = () => {
  try {
    // return async dispatch => {
    //   await firebase.auth().onAuthStateChanged((user)=>{
    //     if(user){
    //       dispatch({type: Types.AUTH, payload : user.uid})
    //     }else{
    //       dispatch({type: Types.AUTHERRO})
    //     }
        
    //   })
    // }
  } catch (error) {
    console.log(error + 'auth')
  }
}

export const Logout = () => {
  try {
    return async dispatch => {
       await firebase.auth().signOut();
      dispatch({type: Types.LOGOUT})
      dispatch({type: 'LOGOUT'})
      dispatch({type:'LIMPAPOSTSREGISTER'})
    }
  } catch (error) {
    return false;
  }
}
