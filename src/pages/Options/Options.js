import React, { PureComponent,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, StyleSheet, View, TouchableOpacity,Alert ,ScrollView,Dimensions,StatusBar} from 'react-native'
import {
    typeVagaCompartilhada,
    typeVagaCompleta
} from '../../redux/ducks/Post'
import AddPhotosPost from '../../components/CadastroPostComponent/AddPhotosPost'
import { setBusca } from '../../redux/ducks/PeoplesSearching'
import ButtomOption from '../../components/subComponentes/ButtomOption'
import Icon from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-simple-toast';

export default function Options (props) {
    const dispatch = useDispatch();
    let imagesPost = useSelector(state => state.post.post.images);
    const user = useSelector(state => state.profile.user)
    function typeVaga(){
        if(imagesPost.length > 3){
            dispatch(typeVagaCompartilhada(true));
            dispatch(typeVagaCompleta(false));
            props.navigation.navigate('newPost',{type:'compartilhada'});
        }else{
            Toast.show('Selecione no mínimo 3 imagens')
        }
    }
    function TypeVagaCompleta(){
        if(imagesPost.length > 3){
            dispatch(typeVagaCompleta(true));
            dispatch(typeVagaCompartilhada(false));
            props.navigation.navigate('newPost',{type:'completa'});
        }else{
            Toast.show('Selecione no mínimo 3 imagens')
        }
    }
    
        return (
        <ScrollView style={{backgroundColor:'#fff'}}>
        <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar barStyle='dark-content'  />
            <AddPhotosPost navigation={props.navigation} />
            <View style={{
            flexDirection:'row',
            width:Dimensions.get('window').width,
            alignItems:'center',
            flexWrap:'wrap',
            justifyContent:'center',
            flex:1
            }}>
            <ButtomOption ativo={true}  
            height={80}
            width = {Dimensions.get('window').width / 2.2}
            function={typeVaga} title='VAGA                   COMPARTILHADA' />
            <ButtomOption ativo={true} 
            height={80}
            width={Dimensions.get('window').width / 2.3}
            function={TypeVagaCompleta} title='IMÓVEL     COMPLETO' />
            </View>
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={()=>props.navigation.navigate('FormPeoplesSearchingMain')}>
            <View style={{
            flex:1,
            height:100,
            marginTop:40,
            paddingHorizontal:18,
            justifyContent:'space-between',
            alignItems:'center',
            flexDirection:'row'}}>
                <View>
                    <Text style={{
                    fontSize:18,
                    color:'#57CF87',
                    fontWeight:'900'}}>Ativar busca por moradia</Text>
                </View>
                <View>
                    <Icon name='addusergroup' size={26} />
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </ScrollView>
        )
    }
// const mapStateToProps = state => ({
//     post : state.post.post,
//     buscando : state.peopleSearching.buscando
// });
