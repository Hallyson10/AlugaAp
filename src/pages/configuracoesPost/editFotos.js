import React,{useEffect,useState} from 'react';
import { View,FlatList,ScrollView ,TouchableOpacity,Text,Alert} from 'react-native';
import { useSelector,useDispatch } from 'react-redux'
// import { Container } from './styles';
import EditarFotos from '../../components/configuracao_post/editarFotos'
import Header from '../../components/subComponentes/Header'
import {RemoveFoto} from '../../redux/ducks/MeusPosts/index'
import {AddPhotosPost} from '../../redux/ducks/Post'
import {RemoveNovaFoto} from '../../redux/ducks/MeusPosts/index'
import ModalAddPhoto from '../../components/RegisterUsers/ModalAddPhoto'
import Icon from 'react-native-vector-icons/AntDesign'
function ConfiguracoesPost(props) {
  let params = props.navigation.state.params;
  const novaImage = useSelector(state => state.meusposts.novaImage);
  const [images,setImages] = useState([]);
  const [isVisibleModalFoto,setIsVisible] = useState(false);

  const dispatch = useDispatch();
  function removeFoto(fotoId){
    if(images.length - 1 >= 3 ){
      const newImages =  images.filter(function(item) { 
      return item.value !== fotoId; 
    });
    params.post.images = newImages
    setImages(newImages);
    dispatch(RemoveFoto(params.post.vagaId,fotoId));
    dispatch(RemoveNovaFoto());
    }else{
      Alert.alert('Ops!!!','Você deve ter no minímo 3 fotos na sua publicação!')
    }
    }
    async function adicionarFotos(fotos){
      var novasI = []
      novasI.push(fotos);
      await dispatch(AddPhotosPost(params.post.vagaId,novasI));
    }

  useEffect(()=>{
    if(novaImage !== null){
      setImages([...params.post.images,novaImage]);
    }else{
      setImages(params.post.images);
    }
   },[novaImage]);

  return (
    <View style={{flex:1,backgroundColor:'#F2F2F2'}}>
    <Header 
      backgroundColor="#57CF87"
      title='Imagens'
      back={()=>props.navigation.goBack()}
    />
    <ScrollView>
    <TouchableOpacity onPress={()=>setIsVisible(true)}>
    <View style={{height:100,backgroundColor:"#57CF87",alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontWeight:'bold',color:'#051E0B'}}>ADICIONAR NOVAS FOTOS</Text>
        <Icon name='camera' color='#051E0B' size={28}/>
    </View>
    </TouchableOpacity>
    <FlatList 
    style={{flex:1}}
      data={images}
      keyExtractor={item=>item.value}
      renderItem={({ item }) => <EditarFotos 
                uri = {item.sucess}
                navigation={props.navigation}
                removeFoto={()=>removeFoto(item.value)}
        />
                }

    />
    </ScrollView>
    <ModalAddPhoto
            isVisible={isVisibleModalFoto}
             selecionaFotos={(fotos)=>adicionarFotos(fotos)}
             onSwipeComplete={()=>setIsVisible(false)}
            />
    </View>
  );
}
export default React.memo(ConfiguracoesPost)