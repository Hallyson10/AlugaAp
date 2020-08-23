import React, { useEffect,useState } from 'react'
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
  const [countLike,setCountLike] = useState(false);

  lastTap = null;
    useEffect(()=>{
        setCountLike(props.item.favorite);
    },[])
      
       async function likar(vagaId){
         if(cliques === 0 && props.item.favorite){
            dispatch(deslike(vagaId))
            setCountLike(false)
          }else{
            dispatch(like(vagaId));
            setCountLike(true);
            Toast.show('Removido dos favoritos')
         }
         if(cliquePost === 0 && props.item.favorite){
          dispatch(favoritarPost(vagaId,user.userId))
         }else if(cliquePost === 0){
          dispatch(desfavoritarPost(vagaId,user.userId));
         }
      }
      async function verificaAcesso(funcao){
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
              <UserPostCabecalho
              user = {props.user}
              data={props.item.createAt}
              completa={props.item.completa}
              anuciante={props.anuciante}
              premiumAnunciante={props.premiumAnunciante}
              visitantePremmium={props.visitantePremmium}
              disponivel={props.item.disponivel}
              onPress={()=>{
                if(!props.anuciante){
                  verificaAcesso(()=>props.navigation.navigate('UsuarioVisitado',{user : props.user}))
                }
              }}
              />
              <PostPhotos 
              valor={props.item.completa ? props.item.valorTotal : props.item.valorIndividual}
              navigation={props.navigation}
              images={props.item.images}
              disponivel={props.item.disponivel}
              //premiumAnunciante={props.premiumAnunciante}
              //visitantePremmium={props.visitantePremmium}
              premiumAnunciante={props.premiumAnunciante}
              visitantePremmium={props.visitantePremmium}
              toPost={()=>verificaAcesso(props.toPerfilVaga)}
              onPressButtonCentral={()=>verificaAcesso(()=>alert('abrindo o modal diretamente para acesso'))}
              // toPost={(index)=>
              //   props.navigation.navigate('ImageTelaGrande',
              //   {images:props.item.images,navigation:props.navigation,index : props.item.images.indexOf(index)})}
              EnviarMensage={props.EnviarMensage}
              postedPost={props.postedPost}
              anuciante={props.anuciante}
              marcarComoDisponivel={props.anuciante && !props.item.disponivel ? props.marcarComoDisponivel : null}
              individual={props.item.individual}
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
              favorite={countLike}
              anuciante={props.anuciante}
              disponivel={props.item.disponivel}
               />
               {props.item.completa || props.anuciante ? <TouchableOpacity onPress={()=>
               verificaAcesso(()=>props.navigation.navigate('InteressadosPost',
                {vagaId : props.item.vagaId}))}>
               <QtdCurtiramPost
                countLikes={props.item.countLikes}
                
                />
               </TouchableOpacity> : null}
            </View>
        )
    
})