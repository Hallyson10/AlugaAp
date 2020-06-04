import React from 'react'
import { View, Text ,Dimensions , TouchableOpacity , StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
const BotoesPersonalidade = () => {
    return (
        <View style={{width:Dimensions.get('window').width/2.4,}}>
        <Text>Você fuma?</Text>
        <View style={styles.container}>
        <Text>ok</Text>
        <Text>FUMO</Text>
        <Text>ok</Text>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        width:Dimensions.get('window').width/2.4,
        height:Dimensions.get('window').height/12,
        backgroundColor : "red",
        flexDirection:'row',justifyContent:'space-around',alignItems:'center'
        },

})

export default BotoesPersonalidade
