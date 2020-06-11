import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, Animated,StatusBar } from 'react-native'
import PostComponent from '../../components/PostComponent/PostComponent'
import { FindPosts, FindMaisPosts} from '../../redux/ducks/Post'
import { FilterPosts } from '../../redux/ducks/Posts/Filters'
import { MarcarComoAlugada,MarcarComoDisponivel } from '../../redux/ducks/MeusPosts/index'
import {favoritarPost} from '../../redux/ducks/Posts/Favorites'
import { SendMessage } from '../../redux/ducks/EntrarEmContato/Mensagem'
import ReturnCarregamentoPost from '../../components/subComponentes/CarregamentoPost'
import Toast from 'react-native-simple-toast'
let time = null
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const Index = (props) => {
    const posts = useSelector(state => state.post.posts);
    const postedPost = useSelector(state => state.post.postedPost);
    const postReserva = useSelector(state => state.post.postReserva);
    const user = useSelector(state => state.profile.user);
    const cliques = useSelector(state => state.post.click);
    const cidadeSearch = useSelector(state => state.post.cidadeSearch);
    const type = useSelector(state => state.filter.type);
    const completa = useSelector(state => state.filter.completa);
    const loadPosts = useSelector(state => state.post.loadPosts);
    const [sizeTela,setSize] = useState(0);
    const dispatch = useDispatch();
    function likar(vagaId){
        if(cliques == 0){
            dispatch(favoritarPost(vagaId,user.userId));
        }
    }

    function solicitar(item,id_solicitante){
        //passando as informações da vaga para mostrar nas solicitações pendentes e aceitas
        let {
            vagaId,idAutor,endereco,descricao,createAt,completa,compartilhada,disponivel,images
            } = item;
        let vaga = {
            vagaId,idAutor,endereco,descricao,createAt,completa,compartilhada,disponivel,images,
            phone : '5588992046291',permissionNumber : false
        }
        dispatch(SendMessage(vaga,id_solicitante))
    }

    function ReturnPost(){
        return(
            <>
            {
                postedPost && <PostComponent 
                    navigation={props.navigation}
                    item={postReserva}
                    user={user}
                    postedPost={true}
                />
            }
            </>
        )
    }
   const y = new Animated.Value(0);
   const onScroll = Animated.event([{ nativeEvent : { contentOffset : { y } } } ],{ useNativeDriver : true})
    return (
        <View style={{marginBottom:3,flex:1,zIndex:1}}>
         <StatusBar barStyle='dark-content' backgroundColor='#F9FFF0' />
          {loadPosts && <ReturnCarregamentoPost array={posts} loadPosts={loadPosts}/>}
             <AnimatedFlatList
             
             scrollEventThrottle={16}
             bounces={false}
                data={posts}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item=>item.vagaId}
                //horizontal
                //pagingEnabled
                //ListHeaderComponent={<ReturnPost/>}
                //onEndReached={temp}
                onEndReachedThreshold={0.7}
                initialNumToRender={10}
                //onRefresh={onRefresh}
                refreshing={false}
                renderItem={({ item }) => <PostComponent 
                item = {item}
                premiumAnunciante={item.user.premium}
                visitantePremmium={user.premium}
                EnviarMensage = {()=>solicitar(item,user.userId)}
                like = {()=>likar(item.vagaId)}
                marcarComoAlugada={()=>{
                    dispatch(MarcarComoAlugada(item.vagaId))
                    Toast.show('Alugada!')
                    }}
                marcarComoDisponivel={()=>{
                    dispatch(MarcarComoDisponivel(item.vagaId))
                    Toast.show('Publicado com sucesso!')
                    }}
                user = {item.user}
                anuciante={item.idAutor === user.userId}
                navigation = {props.navigation}
                />

                }
                {...{onScroll}}
                />
        </View>
    )
}

export default React.memo(Index)
