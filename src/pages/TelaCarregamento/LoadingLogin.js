import React, { useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StyleSheet, View, StatusBar,Alert,Modal } from 'react-native'
import { setUser } from '../../redux/ducks/Profile'
import firebase from '../../Service/index'
import { FindPosts } from '../../redux/ducks/Post'
import { verificaNotifPendente,verificaNotifAceita } from '../../redux/ducks/EntrarEmContato/Mensagem'
import { FindPeoplesSearching } from '../../redux/ducks/PeoplesSearching'
import Geolocation from '@react-native-community/geolocation';

 function LoadingLogin(props) {
        const dispatch = useDispatch();
        const [atived,setAtived] = useState(false);
        const cidadeSearch = useSelector(state=> state.post.cidadeSearch);
        let userId = useSelector(state => state.profile.user);

         useEffect(() => {
          firebase.auth().onAuthStateChanged(async(user)=>{
            if(user){
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
               props.navigation.navigate('Welcome');
            } 
          })
         },[]);
         
        return (
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
              <StatusBar barStyle='dark-content' backgroundColor='#F9FFF0' />
             
            </View>
        )
        
    
}
export default React.memo(LoadingLogin)