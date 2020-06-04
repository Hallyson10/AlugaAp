import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Dimensions } from 'react-native'
import ButtonsFilter from '../subComponentes/ButtonsFilter'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styles from './styles.js'
export default function Filter (props){
        return (
            <View style={{flex:1,backgroundColor:'#FFF'}}>
                <View style={{marginTop:40,height:30,paddingLeft:16}}>
                    <Text style={styles.textOption} >O que você busca?</Text>
                </View>
                <View style={{flex:1,alignItems:'center',marginTop:40,marginBottom:10}}>
                <ButtonsFilter 
                functionOption1={props.onPressCompleta}
                functionOption2={props.onPressCompartilhada}
                option1Atived={props.completa}
                option2Atived={props.compartilhada}
                option1='Imóveis Completos'
                option2='Vagas Compartilhadas'
                 />
                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:"center"}}>
                <TouchableOpacity style={styles.buttonFilter} onPress={props.filtrar}>
                    <Text style={styles.titleFilter}>Filtrar</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    
}
