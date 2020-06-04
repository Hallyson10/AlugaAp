import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const ButtonOptionTrian = () => {
    return (
        <View style={styles.triangle}>
        </View>
    )
}

const styles = StyleSheet.create({
    triangle: { 
        width: 0, 
        height: 0, 
        backgroundColor: 'transparent', 
        borderStyle: 'solid', 
        borderLeftWidth: Dimensions.get('window').width/2.2, 
        borderRightWidth: Dimensions.get('window').width/2.2, 
        borderBottomWidth: 120, 
        borderLeftColor: 'transparent', 
        borderBottomLeftRadius:10,
        borderBottomRightRadius : 10,
        borderRightColor: 'transparent', 
        borderBottomColor: '#A1E5BC',
        marginBottom:5 }
})
export default ButtonOptionTrian
