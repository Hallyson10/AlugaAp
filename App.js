
import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {Alert,View,Text} from 'react-native'
import 'react-native-gesture-handler'
import Navegador from './src/navigator'
import store from './src/redux/store/index'
import firebase from './src/Service/index'
import TelaInicial from './src/pages/TelaInicial/Index' 
import type { RemoteMessage,Notification, NotificationOpen } from 'react-native-firebase';
import ConfigPerfil from './src/pages/ConfiguracoesUsuario/Index'
export default class App extends PureComponent{
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }
  
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        
    } else {
        this.requestPermission();
    }
  }
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body, subtitle } = notification;
        this.showAlert(title, body,subtitle);
    });

    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      const { title, body , subtitle } = message;
        this.showAlert(title, body,subtitle);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body,subtitle } = notificationOpen.notification;
        this.showAlert(title, body,subtitle);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body,subtitle } = notificationOpen.notification;
        this.showAlert(title, body,subtitle);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      this.showAlert(message, '','');
    });
  }
  showAlert(title, body,subtitle) {
    const notification = new firebase.notifications.Notification()
  .setNotificationId('notificationId')
  .setTitle(title)
  .setBody(body)
  .setData({
    key1: 'value1',
    key2: 'value2',
  });
  notification
  .android.setChannelId('channelId')
  // .android.setAutoCancel(true)
  // .android.setPriority(firebase.notifications.Android.Priority.Max)
  // .setSound('default');
  
  
  firebase.notifications().displayNotification(notification)
  }
  render(){
    return (
    <Provider store={store}>
     <Navegador/>
     </Provider>  
  );
}
};
//<MapComponent/>
// {/* <Provider store={store}>
//     <Navegador/>
//     </Provider>  */}