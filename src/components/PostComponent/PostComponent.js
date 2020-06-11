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
      function verificaAcesso(funcao){
      if(props.anuciante||props.item.disponivel && (!props.anuciante && (props.premiumAnunciante || props.visitantePremmium) )){
           funcao()
      }else if(props.item.disponivel){
        alert('abrindo modal para pagamento')
      }else{
        Toast.show('vaga já preenchida!')
      }
      }
   
        return (
            <View style={{backgroundColor:'#FFF',marginTop:6,marginBottom:4}}>
              <TouchableOpacity activeOpacity={2} onPress={()=>verificaAcesso(()=>alert('olá'))}>
              <UserPostCabecalho
              user = {props.user}
              data={props.item.createAt}
              completa={props.item.completa}
              anuciante={props.anuciante}
              premiumAnunciante={props.premiumAnunciante}
              visitantePremmium={props.visitantePremmium}
              disponivel={props.item.disponivel}
              />
              </TouchableOpacity>
              <PostPhotos 
              valor={props.item.completa ? props.item.valorTotal : props.item.valorIndividual}
              navigation={props.navigation}
              images={props.item.images}
              disponivel={props.item.disponivel}
              //premiumAnunciante={props.premiumAnunciante}
              //visitantePremmium={props.visitantePremmium}
              premiumAnunciante={props.premiumAnunciante}
              visitantePremmium={props.visitantePremmium}
              toPost={()=>verificaAcesso(()=>props.navigation.navigate('ProfileVaga',{item : props.item}))}
              onPressButtonCentral={()=>verificaAcesso(()=>alert('abrindo o modal diretamente para acesso'))}
              // toPost={(index)=>
              //   props.navigation.navigate('ImageTelaGrande',
              //   {images:props.item.images,navigation:props.navigation,index : props.item.images.indexOf(index)})}
              EnviarMensage={props.EnviarMensage}
              postedPost={props.postedPost}
              anuciante={props.anuciante}
              marcarComoDisponivel={props.anuciante && !props.item.disponivel ? props.marcarComoDisponivel : null}

               />
              <PostInformationsBottom 
              completa={props.item.completa}
              individual={props.item.individual}
              sala={props.item.sala}
              tipoImovel={props.item.tipoImovel}
              cidade={props.item.endereco.cidade}
              rua={props.item.endereco.rua}
              numero={props.item.endereco.numEndereco}
              estado={props.item.endereco.estado}
              bairro={props.item.endereco.bairro}
              long={props.item.endereco.long}
              lat={props.item.endereco.lat}
              navigation={props.navigation}
              //like={()=>CheckConnectivity()}
              like={props.item.disponivel ? ()=>likar(props.item.vagaId) :()=> Toast.show('Vaga já preenchida')}
              marcarAlugada={props.anuciante && props.item.disponivel ? props.marcarComoAlugada : null}
              favorite={props.item.favorite}
              anuciante={props.anuciante}
              disponivel={props.item.disponivel}
               />
               <TouchableOpacity onPress={()=>
               verificaAcesso(()=>props.navigation.navigate('InteressadosPost',
                {vagaId : props.item.vagaId}))}>
               <QtdCurtiramPost
                countLikes={props.item.countLikes}
                
                />
               </TouchableOpacity>
            </View>
        )
    
})