import React from 'react'
import { View, Text, Dimensions,PixelRatio } from 'react-native'

const Descricao = (props) => {
    const fonteSize = PixelRatio.get()*10
    const fonteSizeMaior = PixelRatio.get()*11.4
    return (
        <>
        <View style={{alignSelf:'flex-start',paddingLeft:14}}>
        <Text style={{fontSize:fonteSize}}>Descrição</Text>
        </View>
        <View style={{
        backgroundColor:'#FFF',
        padding:4,
        borderRadius:10,
        height:Dimensions.get('window').height/6,
        width:Dimensions.get('window').width/1.2}}>
        <Text style={{fontSize:fonteSizeMaior,textAlign:'justify'}}>
            {props.descricao}
        </Text>
        </View>
        </>
    )
}

export default React.memo(Descricao)
