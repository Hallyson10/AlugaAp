import React, { Component, useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Text, StyleSheet, View, BackHandler,TouchableOpacity,ScrollView,SafeAreaView,StatusBar  } from 'react-native'
import { Logout } from '../../redux/ducks/Auth'
import { BuscarMyVagasFavorites } from '../../redux/ducks/Posts/Favorites'
import Photo from '../../components/ModalUsersSearching/Photo'
import moment from 'moment'
import { AlterarFoto,CancelarFoto,AlterarDescricao,DescricaoPessoal } from '../../redux/ducks/Configuracoes/EditarPerfil'
import ModalAddPhoto from '../../components/RegisterUsers/ModalAddPhoto'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import ProfileComponent from '../../components/PerfilUsuario/index'
import {selecionaFotos, RegisterUser} from '../../redux/ducks/Register';

import Toast from 'react-native-simple-toast'
export default function Profile(props){
        const dispatch = useDispatch();
        const [isVisibleModalFoto,setIsVisible] = useState(false);
        const user = useSelector( state => state.profile.user);
        const userEdit = useSelector(state => state.editarperfil.user);
        const oldFoto = useSelector(state => state.editarperfil.fotoTemp);
        const editFoto = useSelector(state => state.editarperfil.editFoto);
        function alterarFoto(){
            setIsVisible(true);
        }
        function alterarDescricao(){
            if(user.descricaoPessoal !== userEdit.descricaoPessoal){
                dispatch(AlterarDescricao(user.userId,user.descricaoPessoal));
            }
        }
        try {
            return (
                <ScrollView>
                <SafeAreaView style={{paddingTop:20,flex:1,backgroundColor:'#FFF'}}>
                <ProfileComponent 
                openConfig={()=>props.navigation.navigate('ConfigPerfil')}
                onPressI={user.linkInstagram !== null ?()=>props.navigation.navigate('RedesSociais',
                     {link:`https://www.instagram.com/${user.linkInstagram}/`}):null}
                onPressF={user.linkFacebook !== null ? ()=>props.navigation.navigate('RedesSociais',
                     {link:`https://www.facebook.com/${user.linkFacebook}`}) : null}
                props={props}
                onPress={alterarFoto}
                isPerfil={true}
                photo={user.fotosPerfil.uri}
                username = {user.username}
                idade = {user.idade}
                linkFacebook={user.linkFacebook}
                linkInstagram={user.linkInstagram}
                escolaridade={user.escolaridade}
                sexo={user.sexo}
                dataNascimento={user.dataNascimento}
                cidadeNatal={user.cidadeNatal}
                editFoto ={editFoto}
                onPressAceite={()=>dispatch(AlterarFoto(user.userId,user.fotosPerfil,oldFoto))}
                onPressRecuse={()=>dispatch(CancelarFoto(oldFoto))}
                onChangeTextP={(descricao)=>dispatch(DescricaoPessoal(descricao))}
                valuePersonalidade={user.descricaoPessoal}
                onEndEditingP={alterarDescricao}
                navigation={props.navigation}
                />
                </SafeAreaView>
                <ModalAddPhoto
                isVisible={isVisibleModalFoto}
                selecionaFotos={(fotos)=>dispatch(selecionaFotos(fotos))}
                onSwipeComplete={()=>setIsVisible(false)}
                />
                </ScrollView>
            )
        } catch (error) {
            console.log('error',error)
            return(
                <View> 
                    <Text>{error}</Text>
                </View>
            )
        }
        
}

const styles = StyleSheet.create({})
