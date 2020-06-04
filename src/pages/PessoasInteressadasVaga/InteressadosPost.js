import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StyleSheet, View, FlatList,ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';
import InteressadosPostComponent from '../../components/InteressadosPostComponent'
import { BuscarUsersFavoritaram } from '../../redux/ducks/Posts/Favorites'
import Header from '../../components/subComponentes/Header'
import { SendMessage } from '../../redux/ducks/EntrarEmContato/Mensagem'
export default function InteressadosPost(props){
    let favoritaramPost = useSelector(state => state.favorite.favoritaramPost); 
    let loadFavoritaram = useSelector(state => state.favorite.loadFavoritaram);
    let userId = useSelector(state => state.profile.user.userId);
    const dispatch = useDispatch();
    let vagaId = props.navigation.state.params.vagaId;
    //let permissionNumber = props.navigation.state.params.permissionNumber;
    //let phone = props.navigation.state.params.phone;
        useEffect(()=>{
            async function disparaBusca(){
                dispatch(BuscarUsersFavoritaram(vagaId));
            }
            disparaBusca();
        },[])
        function EnviarMensagem(idAutor){
            if(idAutor !== userId){
                let data = {
                    idAutor,
                    permissionNumber : false,
                    phone : '5588992046291',
                }
                dispatch(SendMessage(data,userId))
            }else{
                Toast.show('Não permitido enviar pra você mesmo!')
            }
        }
        return (
            <View style={{flex:1}}>
               <Header back={()=>props.navigation.goBack()} backgroundColor='#57CF87' title='Interessados' />
                {loadFavoritaram  ? <ActivityIndicator size="large" color="#7CE5A6" /> : null}
                
                <FlatList 
                data={favoritaramPost}
                renderItem={({ item }) =>  <InteressadosPostComponent 
                onPress={()=>EnviarMensagem(item.userId)}
                userId = {userId} 
                item={item}
                 />}
                keyExtractor = {item => item.userId}
                /> 
            </View>
        )
}


