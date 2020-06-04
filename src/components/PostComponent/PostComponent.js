import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Button,FlatList,TouchableOpacity,Dimensions,NetInfo} from 'react-native'
import { useSelector , useDispatch } from 'react-redux'
import PostPhotos from './PostPhotos'
import UserPostCabecalho from './UserPostCabecalho'
import PostInformationsBottom from './PostInformationsBottom'
import QtdCurtiramPost from './QtdCurtiramPost';
import { favoritarPost, desfavoritarPost } from '../../redux/ducks/Posts/Favorites'
import { like, deslike } from '../../redux/ducks/Post'
import Toast from 'react-native-simple-toast';

export default React.memo(function PostComponent(props) {
  const cliques = useSelector(state => state.post.click);
  const cliquePost = useSelector(state => state.post.clickPost)
  const user = useSelector(state => state.profile.user)
  
  const dispatch = useDispatch();

    lastTap = null;

    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
           //chama a função após dois cliques rápidos
        } else {
          this.lastTap = now;
          return false
        }
      }
      
       async function likar(vagaId){
         if(cliques === 0 && props.item.favorite){
            dispatch(deslike(vagaId))
            Toast.show('Adicionado aos favoritos')
          }else{
            dispatch(like(vagaId));
            Toast.show('Removido dos favoritos')
         }
         if(cliquePost === 0 && props.item.favorite){
          dispatch(favoritarPost(vagaId,user.userId))
         }else if(cliquePost === 0){
          dispatch(desfavoritarPost(vagaId,user.userId));
         }
      }
   
        return (
            <View style={{backgroundColor:'#FFF',marginTop:6,marginBottom:4}}>
              <TouchableOpacity activeOpacity={2} onPress={()=>alert('olá')}>
              <UserPostCabecalho
              user = {props.user}
              data={props.item.createAt}
              completa={props.item.completa}
              />
              </TouchableOpacity>
              <PostPhotos 
              valor={props.item.completa ? props.item.valorTotal : props.item.valorIndividual}
              navigation={props.navigation}
              images={props.item.images}
              toPost={()=>this.props.navigation.navigate('ImageTelaGrande',
                {images:props.item.images,navigation:this.props.navigation,index : props.item.images.indexOf(item)})}
              EnviarMensage={props.EnviarMensage}
              postedPost={props.postedPost}
               />
              <PostInformationsBottom 
              completa={props.item.completa}
              cidade={props.item.endereco.cidade}
              rua={props.item.endereco.rua}
              numero={props.item.endereco.numEndereco}
              estado={props.item.endereco.estado}
              bairro={props.item.endereco.bairro}
              long={props.item.endereco.long}
              lat={props.item.endereco.lat}
              navigation={props.navigation}
              //like={()=>CheckConnectivity()}
              like={()=>likar(props.item.vagaId)}
              favorite={props.item.favorite}
               />
               <TouchableOpacity onPress={()=>{props.navigation.navigate('InteressadosPost',
               {vagaId : props.item.vagaId})}}>
               <QtdCurtiramPost countLikes={props.item.countLikes} />
               </TouchableOpacity>
            </View>
        )
    
})