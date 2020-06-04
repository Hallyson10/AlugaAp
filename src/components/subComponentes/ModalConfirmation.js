import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';

const ModalConfirmation = (props) => {
    const width = Dimensions.get('window').width/3.2
    const height = Dimensions.get('window').height/14
    return (
        <AwesomeAlert
          show={props.show}
          showProgress={false}
          titleStyle={{fontSize:20,fontWeight:'bold'}}
          messageStyle={{fontSize:20,fontWeight:'bold'}}
          confirmButtonColor='#57CF87'
          confirmButtonTextStyle={{
              fontSize : 16,
              fontWeight:'bold'
          }}
          cancelButtonTextStyle={{
            fontSize : 16,
            fontWeight:'bold'
          }}
          cancelButtonStyle={{
              width,
              height,
              alignItems:'center',
              justifyContent:'center'
            }}
            confirmButtonStyle={{
                width,
                height,
                alignItems:'center',
                justifyContent:'center'
              }}
          title="Este número é o seu mesmo?"
          message={props.title}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Não"
          confirmText="Confirmar"
          onCancelPressed={props.Cancel
          }
          onConfirmPressed={props.Confirm
          }
          onDismiss={props.onDismiss}
        />
    )
}

export default ModalConfirmation
