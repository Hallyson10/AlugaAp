import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FormPeoples from '../../components/FormPeoplesSearching'
export default function FormPeoplesSearchingMain (props){
        return (
            <FormPeoples navigation={props.navigation}/>
        )
}
