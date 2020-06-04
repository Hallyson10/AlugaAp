import React from 'react';
import { useSelector, useDispatch } from 'react-redux';;
import { View, Text,ActivityIndicator,Dimensions,TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import moment from 'moment';
import ButtonConversar from './ButtomConversar';
import Photo from './Photo';
import Information from './Information';
import Descricao from './Descricao';
import { SendMessage } from '../../redux/ducks/EntrarEmContato/Mensagem'
function ModalButtom(props){
    const userId = useSelector(state => state.profile.user.userId);
    const dispatch = useDispatch();

    async function EnviarMensagem(){
            let data ={
                idAutor : props.userSearchModal.userId,//receptor
                permissionNumber : false,
                phone : '5588992046291'
            }
            dispatch(SendMessage(data,userId));
    }

    return (
        <View style={{
        flex:1,
        backgroundColor:'transparent',
        alignItems:'center',justifyContent:'center',
        paddingRight:10,
        }}>
            <Modal 
             swipeDirection={['up', 'left', 'right', 'down']}
             animationIn="zoomInDown"
             animationOut="zoomOutUp"
             onSwipeComplete={props.close}
             backdropOpacity={0.8}
             backdropColor='black'
             swipeThreshold={200}
             backdropTransitionInTiming={0.8} isVisible={props.isVisibleModalProfile}>
                  <View style={{ 
                height:Dimensions.get('window').height/1.1,
                borderRadius:14,
                backgroundColor:'#fafafa',
                paddingTop:14,
                
                }}>
                    <TouchableOpacity onPress={props.close}>
                    <View style={{alignSelf:'flex-end',paddingRight:18}}>
                        <Text style={{fontSize:20}}>X</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center'}}>
                    <View style={{
                    backgroundColor:'#fafafa',//'#fafafa'
                    marginBottom:8,
                    //flex:1,
                    alignItems:'center',
                    //height : Dimensions.get('window').height /3.6
                }}>
                    <Photo 
                    idade={props.userSearchModal.user.idade}
                    username={props.userSearchModal.user.username}
                    photo={props.userSearchModal.user.fotosPerfil.uri} />
                    <ButtonConversar
                    onPress={()=>EnviarMensagem()}
                    />
                    </View>
                    <View style={{
                    width:'100%',
                    alignItems:'flex-end',
                    paddingRight:14}}>
                        <Text>{moment(props.userSearchModal.ativou).format('LT')} </Text>
                    </View>
                    <Information
                    citySearching={props.userSearchModal.citySearching}
                    bairro={props.userSearchModal.bairro}
                    tipoBuscaCompartilhada={props.userSearchModal.tipoBuscaCompartilhada}
                    />
                    <Descricao 
                    descricao={props.userSearchModal.descricao}
                    />
                </View>
            </View> 
            </Modal>
        </View>
    )}
export default React.memo(ModalButtom);
