import React,{PureComponent} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { View, StatusBar,Alert } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { Container } from './styles';
import Header from '../../components/subComponentes/Header'
import ConfirmCodComponent from '../../components/RegisterUsers/ConfirmarCodigo'
import { verifyNumber,updateNumber} from '../../redux/ducks/Register'
class ConfirmarCodigoNumber extends PureComponent{
    state = {
        codigo : '',
        time : 60,
        clique :false
    }
    
    verificarNumber(){
        if(this.state.codigo === ''){
                Alert.alert('Ops!','Por favor, preencha o seu código')
        }else if(this.props.codigoVerificacao !== '' && this.state.codigo.toLowerCase() !== this.props.codigoVerificacao){
                Alert.alert('Ops!','Código incorreto,tente novamente');
        }else if(this.state.codigo.toLowerCase()  === this.props.codigoVerificacao || this.props.verificado === 'ok'){
            let userId = this.props.navigation.getParam('userId', '');
            this.props.updateNumber(userId,this.props.phone);
            this.setState({time:60})
             this.props.navigation.navigate('App');
        }
    }
    componentDidMount(){
        if(this.props.verificado === 'pendente' || this.props.verificado === 'enviado'){
            this.Cont();
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.verificado !== this.props.verificado){
            this.Cont();
        }
    }
    Cont = () => {
        this.setState({clique:false});
        setInterval(() => {
            if(this.state.time >= 1){
                this.setState(prevProps => ({time : prevProps.time - 1}))
            }
            return;
        },1000);
    }
    setCodigo(text){
        this.setState({codigo : text});
        if(text.toLowerCase()  === this.props.codigoVerificacao || this.props.verificado === 'ok'){
            //seguir para outra tela
            let userId = this.props.navigation.getParam('userId', '');
            this.props.updateNumber(userId,this.props.phone);
            this.setState({time:60})
            this.props.navigation.navigate('App');
        }
    }

    Reenviar=()=>{
        this.setState({clique:true});
        //escrevaaqui garotão
        this.props.verifyNumber(this.props.phone,true);
    }
    
 render(){ 
  return (
    <View style={{flex:1}}>
        <StatusBar barStyle='light-content' backgroundColor='#57CF87' />
        <Header 
            backgroundColor='#57CF87'
            back={()=>this.props.navigation.goBack()}
        />
        <View style={{flex:1,alignItems:'center',paddingTop:10,marginTop:20}}>
        <ConfirmCodComponent
        clique={this.state.clique}
        onPressReenv={this.Reenviar}
        verificarNumber={()=>this.verificarNumber()}
        phone={this.props.phone}
        verificado={this.props.verificado}
        time={this.state.time}
        setCodigo={(text)=>this.setCodigo(text)}
        loadingSendCode={this.props.loadingSendCode}
        />
        </View>
    </View>
  )}
}
const mapStateToProps = state => ({
    verificado : state.register.verificado,
    phone : state.register.user.phone,
    codigoVerificacao : state.register.codigoVerificacao,
    loadingSendCode : state.register.loadingSendCode
  });
  const mapDispatchToProps = dispatch =>
    bindActionCreators({verifyNumber,updateNumber}, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(ConfirmarCodigoNumber)
