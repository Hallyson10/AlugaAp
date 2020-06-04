import React, {PureComponent} from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-simple-toast'
import {connect} from 'react-redux';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ModalAddPhoto extends PureComponent {
  state = {
    text: 'Oie, Estamos verificando seus dados!',
    isVisible: true,
  };
 
  photo(){
    try {
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
                 const source = {path : response.path, uri : response.uri}
                 this.props.selecionaFotos(source);
                 this.props.onSwipeComplete();
                 Toast.show('Carregando...');
        } 
    });
    } catch (error) {
      Alert.alert("Ocorreu um erro inesperado!(cód : AddFoto)")
    }
 
  }
  galery(){
    try {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
                 const source = {path : response.path, uri : response.uri}
                 this.props.selecionaFotos(source);
                 this.props.onSwipeComplete()
                 Toast.show('Carregando...')
               } });
    } catch (error) {
      Alert.alert("Ocorreu um erro inesperado!(cód : AddFoto)")
    }
    
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Modal 
        style={styles.modal}
             swipeDirection={['down']}
             animationIn='fadeInDown'
             //animationOut="zoomOutUp"
             onSwipeComplete={this.props.onSwipeComplete}
             backdropOpacity={0.8}
             backdropColor='transparent'
             onBackButtonPress={this.props.onSwipeComplete}
             onBackdropPress={this.props.onSwipeComplete}
             swipeThreshold={50}
             backdropTransitionInTiming={400} 
             isVisible={this.props.isVisible}>
                <View style={styles.viewModal}>
                  <TouchableOpacity 
                  style={[styles.touchButtonModal,
                    {borderBottomWidth:1,borderBottomColor : '#F0FFF0'}]
                  }
                  onPress={()=>this.galery()}>
                  <View style={styles.botoesModal}>
                  <Icon color='#07000F' name='picture' size={PixelRatio.get()*18}/>
                  <Text style={styles.textModal}>Galeria</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={styles.touchButtonModal}
                  onPress={()=>this.photo()}>
                  <View style={styles.botoesModal}>
                    <Icon color='#07000F' name='camerao' size={PixelRatio.get()*18}/>
                  <Text style={styles.textModal}>Câmera</Text>
                  </View>
                  </TouchableOpacity>
                </View>
             </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user : state.register.user
});
export default connect(
  mapStateToProps,
  {
  },
)(ModalAddPhoto);
const styles = StyleSheet.create({
  modal : {
    justifyContent:'flex-end',
    margin:0,
    alignItems:'center',
    height:Dimensions.get('window').height/3,
    width:Dimensions.get('window').width/1,
  },
  viewModal : {
    height:Dimensions.get('window').height/3.8,
    width:Dimensions.get('window').width/1,
    borderTopRightRadius:20,
    justifyContent:'space-between',
    borderTopLeftRadius:20,
    borderTopWidth:1,
    borderTopColor :'#F0FFF0',
    backgroundColor:'#57CF87'},
  botoesModal :{
    flexDirection:'row',alignItems:'center'
  },
  textModal:{
    fontWeight:'bold',
    fontSize:PixelRatio.get()*13.6,
    marginLeft:4,
    color:'#07000F'
    },
    touchButtonModal:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
});