import React from 'react'

import { View, Text,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window');

function PerfilPersonalidade(props){
    return(
        <View style={{ height:Dimensions.get('window').height / 1.8,
                backgroundColor:'#051E0B',
                width:width-36,
                marginBottom:6,
                borderRadius:10,
                marginHorizontal:18}}>
                
            </View>
    )
}
export default React.memo(PerfilPersonalidade);