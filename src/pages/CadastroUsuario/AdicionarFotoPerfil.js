import React,{useState} from 'react';
import { View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {
  NewSexo,
  NewDataNascimento,
  NewIdadeUser,
  setCidadeNatal,
  setEscolaridade,
  RegisterUser
} from '../../redux/ducks/Register';
import Header from '../../components/subComponentes/Header'
import EditProfile from '../../components/RegisterUsers/EditProfile'
export default function AdicionarFotosPerfil(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.register.user);
    const [errorCidade,setErrorCidade] = useState(false);
    const [errorSexo,setErrorSexo] = useState(false);
    const [errorData,setErrorData] = useState(false);
    const [errorIdade,setErrorIdade] = useState(false);
    const disabled = useSelector(state => state.register.loadingRegister);
    async function prosseguir(){
      if(user.cidade !== '' && user.sexo !== '' && user.idade >= 17 && user.fotosPerfil.uri !== ''){
          await dispatch(RegisterUser(user));
      }
      if(user.fotosPerfil.uri === ''){
        Alert.alert('Ops!!!',"Por favor, selecione sua melhor foto de perfil.")
      }
      if(user.cidadeNatal === ''){
        setErrorCidade(true);
      }
      if(user.sexo === ''){
        setErrorSexo(true);
      }
      if(user.idade <= 0){
        setErrorData(true);
      }
      if(user.idade <= 16 && user.idade > 0){
        setErrorIdade(true);
      }
    }
  return (
    <View style={{flex:1}}>
      <Header 
            backgroundColor='#57CF87'
            back={()=>props.navigation.goBack()}
        />
        <EditProfile
        username={user.username}
        idade={user.idade}
        photo={user.fotosPerfil.uri}
        onPress={prosseguir}
        escolaridade={user.escolaridade}
        sexo={user.sexo}
        cidadeNatal={user.cidadeNatal}
        setEscolaridade={(item)=>dispatch(setEscolaridade(item))}
        setData={(date)=>{dispatch(NewDataNascimento(date))
                                  setErrorData(false)}}
        setIdade={(idade)=>{dispatch(NewIdadeUser(idade))
                                  setErrorIdade(false)
        }}
        setCidadeNatal={(text)=>{dispatch(setCidadeNatal(text)) 
                                  setErrorCidade(false)}}
        setSexoM={()=>{dispatch(NewSexo('H'))
                    setErrorSexo(false)}}
        setSexoF={()=>{dispatch(NewSexo('M'))
                        setErrorSexo(false)}}
        errorCidade={errorCidade}
        errorSexo={errorSexo}
        errorData={errorData}
        errorIdade={errorIdade}
        disabled={disabled}
        />
    </View>
  );
}
