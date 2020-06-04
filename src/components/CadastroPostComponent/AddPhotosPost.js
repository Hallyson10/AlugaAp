import React, {PureComponent,Component} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {RemovePhotos,SavePhoto } from '../../redux/ducks/Post';
import Icon from 'react-native-vector-icons/FontAwesome5';

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  title: 'Escolha sua melhor foto',
  storageOptions: {
    skipBackup: false,
    path: 'Coliving',
  },
};
class AddPhotosPost extends PureComponent {
  state = {
    error : false
  };

  getPhotos(){
    ImagePicker.openPicker({
      compressImageMaxWidth: 800,
      width:800,
      height:400,
      multiple :true,
      compressImageMaxHeight: 800,
      compressImageQuality: 1,
      cropping : true,
      cropperTintColor : '#fff',
      cropperStatusBarColor : '#fff',
      cropperToolbarColor  : '#fff',
      cropperActiveWidgetColor : '#fff',
      mime : 'image/png'
    }).then(image => {
      this.props.SavePhoto(image);
      //console.log(this.state.images);
    });
  }
  componentDidCatch(error,info){
    this.setState({error});
  }
  addImage = () => {
    if (this.props.post.images.length === 0) {
      return (
        <View
          style={{
            width: Dimensions.get('window').width / 1.0,
            marginBottom: 12,
            marginTop: 10,
            height: 180,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 18,
          }}>
          <TouchableOpacity
            onPress={() => this.getPhotos()}
            style={{
              width: '100%',
              borderRadius: 6,
              borderWidth: 0.6,
              borderColor: '#13BA56',
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name="images" size={20} style={{margin: 5}} />
              <Text style={{color: '#555057'}}>Galeria</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  mapi = () => {
    return this.props.post.images.map((imge,i) => {
      return (
        <View key={i} style={{padding: 2,
          marginBottom: 12,
          marginTop:12}}>
          <ImageBackground
            resizeMode="cover"
            imageStyle={{zIndex: 2, borderRadius: 4}}
            style={{height: 180,
              width: 140,
              marginTop: 8,
              marginBottom: 6,
              marginEnd: 8,}}
            source={{uri:imge.path}}>
            <TouchableOpacity
              style={{margin: 6}}
              onPress={() => this.props.RemovePhotos(imge)}>
              <View
                style={{
                  height: 22,
                  width: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: 'white',
                  borderRadius: 90,
                  backgroundColor: '#57CF87',
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: 'white'}}>X</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    });
  };

  render() {
    if(this.state.error){
      return <View style={{flex:1}}><Text>Ocorreu um erro inesperado</Text></View>
    }
    return (
      <View style={{flex:1,paddingTop:40}}>
        <View
          style={{
            justifyContent: 'center',
            paddingLeft: 16,
            width: '100%',
          }}>
          <Text style={{fontSize:20,color:'#57CF87',textAlign:'left',fontWeight:'bold'}} >
            Adicione Fotos à sua publicação
          </Text>
          <Text style={{color:"#07000F"}}>
            Fotos ajudam na hora de escolher a moradia ideal
          </Text>
        </View>
     
      <View style={{
        height: 240,
        marginTop: 8,
        flex:1,
        alignItems:'center',
        justifyContent:'center'}}>
          
        <View>
          {this.props.post.images.length > 0 ? (
            <ScrollView
              style={{paddingLeft: 14, marginBottom: 12}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingRight: 18,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent:'flex-start',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>{this.mapi()}</View>
                {this.props.post.images.length <= 20 ? (
                  <View
                    style={{
                      height: 180,
                      width: 140,
                      marginBottom: 12,
                      marginTop:14,
                      alignItems: 'center',
                      borderColor: '#7D44FF',
                      borderWidth: 0.6,
                      justifyContent: 'center',
                      marginRight: 14,
                      borderRadius: 6,
                    }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        this.getPhotos()
                      }>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Icon name="images" size={20} style={{margin: 5}} />
                        <Text style={{color: '#555057'}}>Galeria</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          ) : null}
          {this.props.post.images.length === 0 ? (
            <View style={{justifyContent: 'center'}}>{this.addImage()}</View>
          ) : null}
        </View>
      </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  post : state.post.post,
});
//const AddPost = withNavigation(AddPostsToPost)
export default connect(
  mapStateToProps,
  {RemovePhotos,SavePhoto},
)(AddPhotosPost);