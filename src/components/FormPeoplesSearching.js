import React,{PureComponent} from 'react'
import { 
    View, 
    Text,  
    Dimensions,
    ImageBackground,
    Alert,
    StatusBar,
    TouchableOpacity,TextInput,
    KeyboardAvoidingView ,
    ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavigationActions,StackActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import {cidadeBusca,bairroBusca,descricaoBusca,urgenteBusca,StartSearch,setTipoVaga} from '../redux/ducks/PeoplesSearching'
import Header from '../components/subComponentes/Header'
import ButtomOption from './subComponentes/ButtomOption'
import Input from './subComponentes/Input'
class FormPeoplesSearching extends PureComponent{
    state = {
        disabledButton : false
    }
    ativaUrgente = () => {
         this.props.urgente ? this.props.urgenteBusca(false) : this.props.urgenteBusca(true)
    }
    ativaTipo = () => {
       this.props.tipoBuscaCompartilhada ?  this.props.setTipoVaga(false) : this.props.setTipoVaga(true);
    }
    Start = async() => {
        data = {
            userId : this.props.userId,
            sexo : this.props.sexo,
            citySearching : this.props.citySearching,
            coord : this.props.coord,
            bairro : this.props.bairro,
            descricao : this.props.descricao,
            urgente : this.props.urgente,
            cidadeComparator : this.props.cidadeComparator,
            tipoBuscaCompartilhada : this.props.tipoBuscaCompartilhada
        }
        if(this.props.citySearching !== '' && 
            this.props.descricao !== ''){
                const startBusca = await this.props.StartSearch(data);
                if(startBusca){
                this.setState({disabledButton : true});
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Tab' })],
                });
                Toast.show('Sua busca foi ativada!');
                this.props.navigation.dispatch(resetAction);
                }else{
                    Alert.alert('Oie!','No momento só é permitido uma busca por vez,'
                                    +'caso você queira realizar outra busca, por favor remova sua busca antiga :)')
                }
            }else{
                Alert.alert('Ops!','Por favor,insira todos os dados obrigatórios!')
                this.setState({disabledButton : false})
            }
    }
    render(){
    return (
        <KeyboardAvoidingView behavior='height' style={{flex:1,backgroundColor:'#FFF'}}>
            <StatusBar backgroundColor='#57CF87' />
            <Header title='Ativar busca' backgroundColor='#57CF87'/>
            <ScrollView >
            
            <View style={{flex:1,paddingHorizontal:14,marginTop:20}}>
            <Text style={{fontSize:18,color:'#57CF87',fontWeight:'bold'}}>O que você busca?</Text>
            <View style={{
                marginTop:20,
            justifyContent:'flex-end',
            height:Dimensions.get('window').height/9.2,
            width:'100%',}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <ButtomOption 
                color='#07000F' 
                backgroundColor='#F0E478' 
                function={()=>this.ativaTipo()} 
                height={50} width={Dimensions.get('window').width / 2.3} title='Imóvel Completo' 
                ativo={this.props.tipoBuscaCompartilhada ? false : true } />
                <ButtomOption 
                backgroundColor= '#57CF87'
                function={()=>this.ativaTipo()} 
                height={50} width={Dimensions.get('window').width / 2.3}
                 title='Vaga Compartilhada' 
                 ativo={this.props.tipoBuscaCompartilhada ? true : false} />
                </View>
            
            </View>
            <View style={{
            height:Dimensions.get('window').height/5.4,
            marginTop:20,
            marginBottom:20,
            //paddingLeft:20,
            width:'100%',}}>
                <View style={{flex:1}}>
                <Text style={{fontSize:18,color:'#57CF87',fontWeight:'bold'}}>Qual status da sua busca?</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
                <ButtomOption 
                backgroundColor='#57CF87' 
                function={()=>this.ativaUrgente()} 
                height={50} width={Dimensions.get('window').width / 2.3} 
                title='Urgente' 
                ativo={this.props.urgente ?
                this.props.urgente : false } />
                <ButtomOption 
                color='#07000F' 
                backgroundColor='#F0E478' 
                function={()=>this.ativaUrgente()} 
                height={50} width={Dimensions.get('window').width / 2.3}
                title='Posso esperar um pouco' 
                ativo={this.props.urgente ? false : true} />
                </View>
            </View>
            </View>
            <ImageBackground 
            style={{
            width:'100%',height:400}} 
            imageStyle={{height:400,width:'100%'}} 
            source={require('../images/backCad.png')} >
            <View style={{
            height:320,}}>
            <Input 
            title='CIDADE DA BUSCA *'
            placeholder='Cidade' 
            value={this.props.citySearching} 
            onChangeText={(cidade)=>this.props.cidadeBusca(cidade)} />
            <Input 
            title='BAIRRO' 
            value={this.props.bairro} 
            placeholder='Bairro'
            onChangeText={(bairro)=>{this.props.bairroBusca(bairro)}} />
            <Input 
            title='DESCRIÇÃO *'
            height={100} 
            placeholder='Descrição'
            multiline={true}
            value={this.props.descricao} 
            onChangeText={(descricao)=>{this.props.descricaoBusca(descricao)}} />
            </View>
            </ImageBackground>
            <View style={{height:150,alignItems:'center',justifyContent:'center'}}>
                <ButtomOption 
                disabled={this.state.disabledButton}
                ativo
                function={this.Start} 
                height={50}
                width={Dimensions.get('window').width/1.4} title='Ativar Busca' />
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )}
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({cidadeBusca,bairroBusca,descricaoBusca,urgenteBusca,StartSearch,setTipoVaga}, dispatch);

const mapStateToProps = state => ({
    sexo : state.profile.user.sexo,
    username : state.profile.user.username,
    userId : state.profile.user.userId,
    citySearching : state.peopleSearching.citySearching,
    bairro : state.peopleSearching.bairro,
    descricao : state.peopleSearching.descricao,
    urgente : state.peopleSearching.urgente,
    coord : state.peopleSearching.coord,
    cidadeComparator : state.peopleSearching.cidadeComparator,
    tipoBuscaCompartilhada : state.peopleSearching.tipoBuscaCompartilhada

});
export default connect(mapStateToProps,mapDispatchToProps)(FormPeoplesSearching)
