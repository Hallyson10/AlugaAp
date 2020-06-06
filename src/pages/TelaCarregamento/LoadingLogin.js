import React, { useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StyleSheet, View, StatusBar,Alert,Modal,Image } from 'react-native'
import { setUser,ativaModalEmailVerificado } from '../../redux/ducks/Profile'
import { Logout } from '../../redux/ducks/Auth'
import firebase from '../../Service/index'
import { FindPosts } from '../../redux/ducks/Post'
import { verificaNotifPendente,verificaNotifAceita } from '../../redux/ducks/EntrarEmContato/Mensagem'
import { FindPeoplesSearching } from '../../redux/ducks/PeoplesSearching'
import Geolocation from '@react-native-community/geolocation';
 function LoadingLogin(props) {
        const dispatch = useDispatch();
        const cidadeSearch = useSelector(state=> state.post.cidadeSearch);
        let userId = useSelector(state => state.profile.user);

         useEffect(() => {
           try {
            firebase.auth().onAuthStateChanged(async(user)=>{
              if(user){
                if(!(user.emailVerified)){
                  props.navigation.navigate('TelaInicial');
                  dispatch(ativaModalEmailVerificado())           
                  return;
                }
                //buscando informações de usuário, pois causava erro no profile.
  
                const find = await firebase.firestore().collection('users').doc(user.uid);
                const data = (await find.get()).data();
                if(!data.user.phoneVerificado){
                dispatch(setUser(data.user));
                 dispatch(verificaNotifPendente(user.uid))
                 dispatch(verificaNotifAceita(user.uid));
                if(cidadeSearch === ''){
                  dispatch(FindPosts(user.uid));
                  dispatch(FindPeoplesSearching());
                 }
                  props.navigation.navigate('Post');
                }else{
                  dispatch(setUser(data.user));
                  if(cidadeSearch === ''){
                  dispatch(FindPosts(user.uid));
                  dispatch(FindPeoplesSearching());
                 }
                  props.navigation.navigate('PhoneNumber',{userId: data.user.userId}) ;
                }
              }else{
                props.navigation.navigate('TelaInicial');
              }
            })
           } catch (error) {
             alert(JSON.stringify(error))
           }
         },[]);
         
        return (
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
              <StatusBar barStyle='dark-content' backgroundColor='#F9FFF0' hidden />
             <Image resizeMode='cover' style={{height:'100%',width:'100%'}} source={require('../../images/454.jpg')} />
            </View>
        )
        
    
}
export default React.memo(LoadingLogin)