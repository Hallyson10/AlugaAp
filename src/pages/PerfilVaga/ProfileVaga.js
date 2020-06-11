import React,{useState, useEffect} from 'react';
import { View,StyleSheet,ScrollView,Dimensions,Text,PixelRatio,TouchableOpacity,Animated} from 'react-native';
import { FindPost } from '../../redux/ducks/Post'
import { BuscarUsersFavoritaram } from '../../redux/ducks/Posts/Favorites'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconA from 'react-native-vector-icons/AntDesign'
import Endereco from '../../components/PerfilVaga/Endereco'
import Descricao from '../../components/PerfilVaga/Descricao'
import Informacoes from '../../components/PerfilVaga/Informacoes'
import Interessados from '../../components/PerfilVaga/Interessados'
import Mapa from '../../components/PerfilVaga/Mapa'
import Comodos from '../../components/PerfilVaga/Comodos'
import ListPhotos from '../../components/subComponentes/ImagesListPost'
import { useDispatch,useSelector } from 'react-redux';
const sizePixel = PixelRatio.get();
const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height / 8;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = 10;
const PerfilVaga = (props) => {
    const [clique,setClique] = useState(false);
    const [favorite,setFavorite] = useState(false);
    const premiumVisitante = useSelector(state => state.profile.user.premium);
    const userId = useSelector(state => state.profile.user.userId);
    const post = useSelector(state => state.post.postPerfil);
    const usersFavoritaram = useSelector(state => state.favorite.favoritaramPost);
    const loadingPostPerfil = useSelector(state => state.post.loadingPostPerfil);
    const dispatch = useDispatch();
    const scrollY = new Animated.Value(0);
    const scrollOpacity = new Animated.ValueXY();
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });
      const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 1, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.4, 0],
        extrapolate: 'clamp',
      });
      const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      });
      const opacityAnimation = scrollOpacity.x.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    let vagaId = props.navigation.state.params.item.vagaId;

    useEffect(() => {
            async function busca(){
                await dispatch(FindPost(vagaId));
                await dispatch(BuscarUsersFavoritaram(vagaId))
            }
            busca();
    },[])
  return (
      <View style={{flex:1}}>
        {   loadingPostPerfil ? <View>
            <Text>carregando</Text>
        </View> :
            post.disponivel && (premiumVisitante || post.user.premium) || (post.idAutor === userId)?
        <>
        <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}]
        )}
        >
        <Animated.View 
        TouchableOpacity
        activeOpacity={1}
        style={[styles.imageView,{opacity:opacityAnimation}]}
        >
            <ListPhotos
                navigation={props.navigation}
                disponivel = {post.disponivel}
                anuciante={post.idAutor === userId}
                visitantePremmium={post.premiumVisitante}
                premiumAnunciante={post.idAutor}
                data={post.images}
            />
        </Animated.View>
        <View style={styles.buttonFavorite}>
            <TouchableOpacity activeOpacity={1} onPress={()=>setFavorite(favorite ? false : true)}
             style={[styles.subButtonFavorite,{backgroundColor:favorite ? '#FFF': '#F9FFF0' }]}>
            <Icon solid={favorite ? true : false} 
                    color='#080809' 
                    selectable={favorite}
                    name='bookmark' size={sizePixel*20} /> 
            </TouchableOpacity>
        </View>
        <View style={{flex:1,backgroundColor:'#FFF'}}>
        <Endereco 
            valorIndividual={post.completa ? post.valorTotal : post.valorIndividual}
            valorTotal={post.valorTotal}
            cidadeVaga={post.endereco.cidade}
            estadoVaga={post.endereco.estado}
            ruaVaga={post.endereco.rua}
            numeroVaga={post.endereco.numEndereco}
            bairroVaga={post.endereco.bairro}
        />
        <Comodos
            qtdQuartos={post.qtdQuarto}
            qtdBanheiros={post.qtdBanheiros}
            qtdSuites={post.qtdQuartoSuite}
            qtdMorando={post.qtdPessoasMorando}
            completa={post.completa}
            preferencia={post.preferenciaSexo}
            qtdVagas={post.qtdVagas}
        />
        <Interessados
            data={usersFavoritaram}
        />
        <Descricao
            descricao={post.descricao}
        />
        <Informacoes
            comodides={post.comodides}
        />
        <Mapa/>
        </View>
        </ScrollView> 
        <Animated.View style={[styles.header,{height : headerHeight,backgroundColor : clique ? 'transparent' : 'rgba(249, 255, 240, 0.4)',
        opacity: imageOpacity, transform: [{translateY: imageTranslate}]}]}>
      <TouchableOpacity style={[styles.buttonBack]}>
            <IconA name='left' size={28} color = {props.disponivel || clique ? '#FFF' : '#003228'}/>
      </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={()=>setClique(clique ? false : true)} style={[styles.textsHeaderView]}>
        <View style={{width:'80%',alignItems:'center'}}>
            <Text style={[styles.titleHeader,{color : props.disponivel || clique ? '#FFF' : '#003228'}]}>
            {post.completa ? "Imóvel completo" : "Vaga compartilhada"} 
            </Text>
            <Text style={[styles.subTitleHeader,{color:clique || props.disponivel? '#FFF' : '#003228'}]}>{post.completa ? post.tipoImovel : 
                                                post.individual ? "Quarto completo" : post.sala ? "Sala" : 'Quarto compartilhado'}</Text>
        </View>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.buttonConversar}>
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Text style={{fontSize :sizePixel * 12.8 , color : '#FFF',fontWeight:'900'}}>Enviar Mensagem</Text>
        </View>
      </View>
      </> : 
      <View>
          <Text>Ok</Text>
      </View>
      }
      </View>
  )
}

const styles = StyleSheet.create({
    header : {
        height : height/8,
        alignItems:'center',
        flexDirection : 'row',
        position: 'absolute',
        top: 0,
        backgroundColor:'#FFF',
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    buttonConversar : {
        height : height/14,
        backgroundColor:'#57CF87',
        justifyContent:'center',
        paddingLeft:10
    },
    buttonBack : {
        height : height / 8,
        width : width / 5.4,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center'
    },
    textsHeaderView : {
        flex:1,
        justifyContent:'center'
    },
    titleHeader : {
        fontSize : sizePixel * 12.8,
        color : '#FFF',
        fontWeight :'bold'
    },
    subTitleHeader:{
        fontSize : sizePixel * 12,
        color : '#c4c4c4',
        fontWeight :'600'
    },
    imageView : {
        height : height/2,
        backgroundColor:'#ccc'
    },
    buttonFavorite : {
        position : 'absolute',
        zIndex:10,
        borderRadius:180,
        top : '16.8%',
        right : '6%',
        height:50,
        width : 50,
        backgroundColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
    },
    subButtonFavorite : {
        position : 'absolute',
        borderRadius:180,
        height:46,
        width : 46,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default PerfilVaga;