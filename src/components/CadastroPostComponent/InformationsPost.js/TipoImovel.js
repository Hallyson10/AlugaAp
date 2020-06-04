import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { View,Dimensions,StyleSheet,Picker,Text } from 'react-native'
import { setTipoImovel } from '../../../redux/ducks/Posts/CadastroPost'
import styled from './Styles'
const TipoImovel = () => {
    const tipoImovel = useSelector(state => state.post.post.tipoImovel);
    const dispatch = useDispatch();
    return (
        <>
        <View >
        <Text style={[style.topico,style.topicosEspeciais]}>Tipo Imóvel</Text>
        </View>
        <View style={styles.containerOptions}>
        <Picker
            selectedValue={tipoImovel}
            style={{alignItems:'center',width:Dimensions.get('window').width/1.1,
            height:Dimensions.get('window').height/12}}
            onValueChange={(itemValue, itemIndex) => dispatch(setTipoImovel(itemValue))}
            >
                <Picker.Item label="Casa" value="Casa" />
                <Picker.Item label="Apartamento" value="Apartamento" />
                <Picker.Item label="Kitnet" value="Kitnet" />
                <Picker.Item label="Hotel" value="Hotel" />
                <Picker.Item label="Pousada" value="Pousada" />
            </Picker>
            </View>
            </>
    )
}
const styles = StyleSheet.create({
    containerOptions : {
        width:Dimensions.get('window').width/1.1,
        height:Dimensions.get('window').height/12,
        borderColor:'#7CE5A6',
        backgroundColor:'#FFF',
        borderWidth:1,
        marginBottom: 10,
        padding:0.1
    }
})
export default TipoImovel
