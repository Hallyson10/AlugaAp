import React, { Component } from 'react'
import { View } from 'react-native'
import NewPostComponent from '../../components/CadastroPostComponent/NewPostComponent'
import Header from '../../components/subComponentes/Header'
import ModalNewPostCarregamento from '../../components/subComponentes/ModalNewPostCarregamento'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationActions,StackActions } from 'react-navigation';
function NewPost(props) {
   let loadCep = useSelector(state => state.post.loadCep);
   const endereco = useSelector(state => state.post.post.endereco);
    const loadLongLat = useSelector(state => state.post.loadLongLat)
    let type = props.navigation.getParam('type');
    
//    this.props.post.idAutor = this.props.user.userId;
    //         this.props.post.tokenNotification = this.props.user.tokenNotification;
    //        await this.props.registerPost(this.props.post);
//    const resetAction = StackActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({ routeName: 'Tab' })],
    //     });
    //     this.props.navigation.dispatch(resetAction);

    async function prosseguir(){
        if(endereco.cep !== '' && endereco.numEndereco !== '' && endereco.cidade !== '' && endereco.long !== '' && endereco.lat !== ''){
            props.navigation.navigate('InformationsPost',{type})
        }else{
            alert('Por favor,insira todos os dados!');
        }
    }
        return (
            <View style={{flex:1}}>
                <Header
                 back={()=>props.navigation.navigate('Tab')} 
                 title='Publicar vaga'
                 right='1/2'
                 backgroundColor = '#57CF87'
                 />

                <NewPostComponent 
                prosseguir={()=>prosseguir()} 
                navigation={props.navigation} />

                <ModalNewPostCarregamento isVisible={loadLongLat} />
                <ModalNewPostCarregamento isVisible={loadCep} />
            </View>
        )
}
export default React.memo(NewPost)
