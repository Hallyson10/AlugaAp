import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Modal from "react-native-modal";
const ModalNewPostCarregamento = (props) => {
    return (
        <View>
            <Modal backdropTransitionInTiming={0.8} backdropOpacity={0} isVisible={props.isVisible}>
            <View style={{ flex: 1,backgroundColor:'transparent',alignItems:'center',justifyContent:'center' }}>
                <ActivityIndicator size='large' color='black' />
            </View>
            </Modal>
        </View>
    )
}

export default ModalNewPostCarregamento
