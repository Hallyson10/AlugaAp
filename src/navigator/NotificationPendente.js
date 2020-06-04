import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector , useDispatch } from 'react-redux'

const NotificationPendente = (props) => {
    const newPendente = useSelector(state => state.mensagem.newSolicitacaoPendente);
    const countPendente = useSelector(state => state.mensagem.countPendentes);

    return(
        <>{newPendente ? <LinearGradient 
              angleCenter= {{ x: 0.5, y: 0.5}}
              locations={[0,0.5,1]}
              colors={['#13BA56',"#57CF87",'#13BA56']}
              style={{
                position: 'absolute',
                right : props.right,
                left: props.left,
                top: props.top,
                borderRadius: 14,
                padding:1,
                width: props.width,
                height: props.height,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              > 
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold',textAlign:'center' }}>
                  {countPendente >= 1 && countPendente < 1000 ? countPendente : countPendente >= 1000 ? countPendente.toString().slice(0,1)+'K': null }
                </Text>
              </LinearGradient> : <></>}</>
        )
}

export default NotificationPendente
