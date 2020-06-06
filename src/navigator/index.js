import React from 'react'
import { View, Text } from 'react-native'
import {
    createAppContainer,
    createSwitchNavigator,
  } from 'react-navigation';
  import { createStackNavigator } from 'react-navigation-stack';
  import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
  //import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import MeusPosts from '../pages/MeusPosts/index'
import EditarFotosPost from '../pages/configuracoesPost/editFotos'
import ConfigPost from '../pages/configuracoesPost/Index'
import ConfigEndereco from '../pages/configuracoesPost/ConfigEndereco'
import NotificationIcon from './NotificationIcon'
import NotificationAceita from './NotificationAceita'
import NotificationPendente from './NotificationPendente'
  import Icon from 'react-native-vector-icons/AntDesign';
  import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Welcome from '../pages/BoasVindas/Welcome' 
import FormName from '../pages/CadastroUsuario/FormName'
import FormSenha from '../pages/CadastroUsuario/FormSenha'
import PhoneNumber from '../pages/CadastroUsuario/PhoneNumber'
import ConfirmarCodigo from '../pages/CadastroUsuario/ConfirmCodigoNumber'
import AdicionarFotosPerfil from '../pages/CadastroUsuario/AdicionarFotoPerfil'
import Login from '../pages/LoginUsuario/Auth'
import Profile from '../pages/PerfilUsuario/Profile'
import ProfileVaga from '../pages/PerfilVaga/ProfileVaga'
import LoadingLogin from '../pages/TelaCarregamento/LoadingLogin'
import Post from '../pages/AllPosts/Post'
import InteressadosPost from '../pages/PessoasInteressadasVaga/InteressadosPost'
import newPost from '../pages/CadastroPost/NewPost'
import InformationsPost from '../pages/CadastroPost/InformationsPost'
import FormPeoplesSearchingMain from '../pages/CadastroPessoasProcurandoVaga/FormPeoplesSearchingMain'
import Options from '../pages/Options/Options'
import MapComponent from '../components/MapComponent'
import ImageTelaGrande from '../components/subComponentes/ImageTelaGrande'
import Filter from '../pages/FiltrarBusca/Filter'
import AllPessoas from '../pages/PessoasProcurando/Index'
import Solicitacoes from '../pages/Solicitacoes/Index'
import FilterPeoples  from '../pages/FiltrarBusca/FilterPeoples'
import SolicitacoesAceitas from '../pages/Solicitacoes/Aceitas'
import RedesSociais from '../pages/RedesSociais/index'
import ConfigPerfil from '../pages/ConfiguracoesUsuario/Index'
import RedefinirSenha from '../pages/RecuperarSenha/RecuperarSenha'
import TelaInicial from '../pages/TelaInicial/Index'
// const TabTop = createMaterialTopTabNavigator({
//   Solicitacoes : {
//     name : 'solicitacoes',
//     screen : Solicitacoes,
//     navigationOptions: ({navigation,screenProps})=>
//     ({
//       tabBarLabel:"Recebidas",
//       tabBarIcon: ({ tintColor }) => (
//         <>
//        {<NotificationPendente
//         width= {24}
//         height= {24}
//         left = {-22.8}
//         top = {-14}
//         />}
//         <Icon name="lock1" size={24} color={tintColor}/>
//         </>
//       )
//     })
//   },
//   Liberadas : {
//     name: 'aceitas',
//     screen : SolicitacoesAceitas,
//     navigationOptions: ({navigation,screenProps})=>({
//       tabBarLabel:"Liberadas",
//       tabBarIcon: ({ tintColor }) => (
//         <>
//        {<NotificationAceita
//         width= {14}
//         height= {14}
//         left = {-8}
//         top = {-8}
//         />}
//         <Icon name="unlock" size={24} color={tintColor}/>
//         </>
//       )
//     })
//   }
// },{
// tabBarOptions: {
//   showIcon:true,
//   labelStyle: {
//     fontSize: 12,
//   },
//   inactiveTintColor:'#07000F',
//   activeTintColor:'#57CF87',
//   indicatorStyle:{
//     backgroundColor:'#fff'
//   },
//   tabStyle: {
//     marginTop : 20,
//     flex:1,
//     flexDirection:'row',
//     alignItems:'center'
//   },
//   style: {
//     backgroundColor: '#fff',
//     elevation:0
//   },
// }}
// )

const Tab = createMaterialBottomTabNavigator ({
  Post :{
    screen : Post,
    navigationOptions: {
      tabBarLabel:"Posts",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={24} color={tintColor}/>
      )
    },
  },
  Pessoas :{
    screen : AllPessoas,
    navigationOptions: {
      tabBarLabel:"Colegas",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="team" size={24} color={tintColor}/>
      )
    },
  },

  Options : {
    screen : Options,
    navigationOptions:{
      title : 'Publicar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="pluscircleo" size={24} color={tintColor}/>
      )
    }
  },
  Solicitacoes :{
    screen : Solicitacoes,
    navigationOptions: ({navigation,screenProps})=>
    ({
      tabBarLabel:"Solicitações",
      tabBarIcon: ({ tintColor }) => (
        <View 
        style={{height:28,
        justifyContent:'center',
        alignItems:'center',
        width:24,
        marginBottom:10.8}}>
            <Icon name="bells" size={24} color={tintColor}/>
            {<NotificationIcon 
        width= {12}
        height= {12} 
        top={-6}
        right = {-6}/>}
        </View>
      )
    }),
  },
  Profile : {
    screen : Profile,
    navigationOptions:{
      title : 'Perfil',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={26} color={tintColor}/>
      ),
    }
  }

},
{
  initialRouteName: 'Post',
  tabBarOptions:{
    showIcon: true,
  },
  activeColor: '#051E0B',
  inactiveColor: '#B8E5CA',
  barStyle: { backgroundColor: '#fff' },
})
const LoadingLog = createStackNavigator({
  LoadingLogin
},
{
  initialRouteName : 'LoadingLogin',
  headerMode : 'none'
})

const Auth = createStackNavigator({
  TelaInicial,
  Login,
  FormName,
  FormSenha,
  PhoneNumber,
  ConfirmarCodigo,
  AdicionarFotosPerfil,
},
{
  initialRouteName : 'TelaInicial',
  headerMode : 'none'
}
);
const RegisterOptions = createStackNavigator({
  newPost : {
    screen : newPost
  }
},{
  headerMode : 'none'
})
const App = createStackNavigator(
  {
   Tab,
   RegisterOptions,
   ProfileVaga,
   InteressadosPost,
   FormPeoplesSearchingMain,
   MapComponent,
   ImageTelaGrande,
   Filter,
   FilterPeoples,
   InformationsPost,
   RedesSociais,
   Profile,
   ConfigPerfil,
   MeusPosts,
   EditarFotosPost,
   ConfigPost,
   ConfigEndereco,
   RedefinirSenha 
},
{
  initialRouteName :  'Tab',
  headerMode : 'none'
}
);
const Application = createSwitchNavigator({
  LoadingLog, 
  Auth,
  App
})
export default createAppContainer(Application);