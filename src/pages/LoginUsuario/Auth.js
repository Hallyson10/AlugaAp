import React, { Component } from 'react'
import { Text, View, SafeAreaView,StatusBar ,ScrollView,Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { Email, Password, Login } from '../../redux/ducks/Auth'
import { setUser } from '../../redux/ducks/Profile'
import { bindActionCreators } from 'redux'
import  Texts  from '../../styles/texts'
import { Fundo } from '../../styles/fundos'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import InputRegister from '../../components/RegisterUsers/InputRegister'
class Auth extends Component {
    state = {
      secureTextEntry : true,
      errorEmail :false,
      errorSenha : false
    }
    componentDidUpdate = async(prevProps) => {
      if(prevProps.isLogged !== this.props.isLogged){
        await this.props.setUser(this.props.userId);
        this.props.navigation.navigate('App');
      }
     
    }
    
     mostraSenha = () =>{
      this.state.secureTextEntry ? this.setState({secureTextEntry :false}) : this.setState({secureTextEntry :true});
    }
    
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#FFF'}} >
            <StatusBar hidden />
              <View style={{flex:1,marginTop:10,marginLeft:12,justifyContent:'flex-end'}}>
              <Text style={[Texts.textIntroduction,{color:'#57CF87',fontSize : 24}]}>Bem Vindo(a)</Text>
              </View>
              <View style={[Fundo.padrao,{backgroundColor:'#FFF',flex:4}]}>
              <InputRegister
                autoFocus
                onChangeText={(email)=>{this.props.Email(email)}}
                errorName={this.props.erroAuth.email}
                error={this.props.erroAuth.email ? true : this.state.errorEmail}
                placeholder='Ex : julia@gmail.com'
                title='Digite seu e-mail?'
                value={this.props.email}
                returnKeyType={"next"}
                onSubmitEditing={()=>this.secondInput.focus()}
              />
              <InputRegister
                onPressMostrar={this.mostraSenha}
                onChangeText={(password)=>{this.props.Password(password)}}
                errorName={this.props.erroAuth.password}
                error={this.props.erroAuth.password ? true : this.state.errorSenha}
                value={this.props.password}
                title='Digite sua senha'
                placeholder='mínimo 6 digitos'
                secureTextEntry={this.state.secureTextEntry}
                senhaView={this.props.password !== '' ? true : false}
                ref={(input)=>this.secondInput = input}
              />
              <ButtonNext
                onPress={()=>this.props.Login(this.props.email,this.props.password)}
                title='Entrar'
                disabled={this.props.loadingAuth}
              />
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
  userId : state.auth.userId,
  email : state.auth.email,
  password : state.auth.password,
  erroAuth : state.auth.erroAuth,
  isLogged : state.auth.isLogged,
  loadingAuth : state.auth.loadingAuth,
});
const mapDispathToProps = dispatch => 
  bindActionCreators({ Login, Email, Password, setUser }, dispatch);

export default connect(mapStateToProps,mapDispathToProps)(Auth);
