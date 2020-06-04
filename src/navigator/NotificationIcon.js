import React from 'react';
import {useSelector , useDispatch } from 'react-redux'
import { View , Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/AntDesign';

function NotificationIcon(props){
    const newAceita = useSelector(state => state.mensagem.newSolicitacaoAceita);
    const newPendente = useSelector(state => state.mensagem.newSolicitacaoPendente);
    return(
    <>{newAceita || newPendente ? <LinearGradient 
          angleCenter= {{ x: 0.5, y: 0.5}}
          locations={[0,0.5,1]}
          colors={['#13BA56',"#57CF87",'#13BA56']}
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right : props.right,
            left: props.left,
            top: props.top,
            borderRadius: 8,
            width: props.width,
            height: props.height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          > 
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {props.text}
            </Text>
          </LinearGradient> : <></>}</>
    )
  }
  export default NotificationIcon;