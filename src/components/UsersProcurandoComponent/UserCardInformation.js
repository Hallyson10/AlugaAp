import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const UserCardInformation = (props) => {
    return (
        <View style={{
        flex:1,
        width: Dimensions.get('window').width/2.6,
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius:14,
        borderBottomRightRadius:14,
        padding:6
        }}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingLeft:6,paddingRight:6,width: Dimensions.get('window').width/2.6}}>
                    <Text style={{textAlign:'center',fontWeight:'900'}}>PROCURANDO EM {props.citySearching.toUpperCase()}</Text>
            </View>
        </View>
    )
}

export default UserCardInformation
