import React,{useEffect} from 'react';
import { View ,FlatList,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
// import { Container } from './styles';
import HeaderConfig from '../../components/subComponentes/HeaderConfig'
import {buscaMeusPosts} from '../../redux/ducks/MeusPosts/index'
import MeusPostsComponent from '../../components/MeusPosts/index'
import Icon from 'react-native-vector-icons/FontAwesome5'

function MeusPosts(props) {
    const posts = useSelector(state => state.meusposts.posts);
    const userId = useSelector(state => state.profile.user.userId);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function busca(){
          await dispatch(buscaMeusPosts(userId));
        }
        busca();
    },[]);
  return (
    <>
    <HeaderConfig  
            title='Minhas Publicações'
            backgroundColor='#57CF87'
            IconLeft={<Icon name='arrow-left' size={28} color='#FFF' />}
            onPressLeft={()=>props.navigation.goBack()}
            //onPressRight={aceitarUpdate}
      />
    <FlatList
    data={posts}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={true}
    keyExtractor={item=>item.vagaId}
    //horizontal
    //pagingEnabled
    //ListHeaderComponent={<Header/>}
    //onEndReached={_handleLoadMore}
    //onEndReachedThreshold={0.6}
    //initialNumToRender={1}
    //onRefresh={onRefresh}
   // refreshing={false}
    renderItem={({ item }) => 
    <View>
      <MeusPostsComponent 
      item={item}
      navigation={props.navigation}
      uri={item.images[0].sucess}/>
    </View>
    }
    />
    </>
  );
}
export default React.memo(MeusPosts)
