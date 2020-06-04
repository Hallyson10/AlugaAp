import React from 'react'
import { View, Text,Dimensions,ScrollView } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import Header from '../../components/subComponentes/Header'
import Informations from '../../components/CadastroPostComponent/InformationsPost.js/Informations'
import ButtonOption from '../../components/subComponentes/ButtomOption'
import { registerPost } from '../../redux/ducks/Post'
import ModalNewPostCarregamento from '../../components/subComponentes/ModalNewPostCarregamento'
import { NavigationActions,StackActions } from 'react-navigation';
import Toast from 'react-native-simple-toast'
const InformationsPost = (props) => {
    let type = props.navigation.getParam('type');
    let loadRegisterPost = useSelector(state => state.post.loadRegisterPost);
    const dispatch = useDispatch();
    const loadPosts = useSelector(state => state.post.loadPosts);
    const preferenciaSexo = useSelector(state => state.post.post.preferenciaSexo);
    const valorTotal = useSelector(state => state.post.post.valorTotal);
    const post = useSelector(state => state.post.post);
    const user = useSelector(state => state.profile.user);

    function CadastrarPost(){
        if(valorTotal !== ''){
            post.tokenNotification = user.tokenNotification;
            post.idAutor = user.userId
            dispatch(registerPost(post));
            setTimeout(()=>{
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
                    });
                    props.navigation.dispatch(resetAction);
            },5000)
           
        }
    }
    return (
        <View style={{flex:1}}>
            <Header
                 back={()=>props.navigation.goBack()} 
                 title='Publicar vaga'
                 right='2/2'
                 backgroundColor = '#57CF87'
                 />
                 <ScrollView>
                 <Informations type={type}/>
                 <View style={{height: Dimensions.get('window').height/6,alignItems:'center'}}>
                 <ButtonOption 
                        disabled={loadRegisterPost}
                        title='FINALIZAR'
                        ativo
                        function={CadastrarPost}
                        height={50}
                        width={Dimensions.get('window').width/1.4}
                        />
                 </View>
                 </ScrollView>
                <ModalNewPostCarregamento isVisible={loadRegisterPost} />
        </View>
    )
}

export default React.memo(InformationsPost)
