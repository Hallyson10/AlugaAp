import React, {PureComponent} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import moment from 'moment'

import ImageUser from './ImageUserCard'
import UserCardInformation from './UserCardInformation'
export default class UserCard extends PureComponent {
  state = {
    animatePress: new Animated.Value(1),
    nameUser: '',
    yearUser: '',
    fotoUser: '',
    numberUser: '',
    descriptionUser: '',
    CityOfFindUser: '',
    referenciaOfFind: '',
  };

  AnimateIn = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 0.9,
      duration: 500,
    }).start();
  };

  AnimateOut = () => {
    Animated.timing(this.state.animatePress, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  render() {
    return (
      <View style={{marginTop:4,marginBottom:6,backgroundColor:'transparent'}}>
        <TouchableWithoutFeedback
          onPress={this.props.onPress}
          onPressIn={this.AnimateIn}
          onPressOut={this.AnimateOut}
          onLongPress={() => {}}>
          <Animated.View
            style={{
              alignItems :'center',
              borderRadius : 14,
              borderColor : "#ccc",
              borderWidth : 0.4,
              borderBottomWidth : 0.4,
              height: Dimensions.get('window').height/2.5,
              width: Dimensions.get('window').width/2.5,
              transform: [
                {
                  scale: this.state.animatePress,
                },
              ],
            }}>
           <ImageUser 
           username={this.props.item.user.username}
           idade={this.props.item.user.idade}
           image={this.props.item.user.fotosPerfil.uri} 
           />
           <UserCardInformation 
           citySearching={this.props.item.citySearching}
           />
           <View style={{padding:4}}>
             <Text style={{fontSize:12.8,fontWeight:'bold',textAlign:'center'}}>{moment(this.props.item.ativou).calendar()}</Text>
           </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View> 
    );
  }
}
