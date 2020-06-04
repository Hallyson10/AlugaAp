import React, { Component } from 'react'
import { Text,ScrollView, StyleSheet, View , TextInput, TouchableOpacity,ImageBackground, Alert} from 'react-native'
import FormLocation from '../../components/CadastroPostComponent/FormLocation'

export default function NewPostComponent(props){
        return (
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                <FormLocation prosseguir={props.prosseguir} navigation={props.navigation}/>
                </ScrollView>
            </View>
        )
}
