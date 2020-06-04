import React from 'react'
import { View, Text ,TouchableOpacity, Dimensions} from 'react-native'
import ButtonsFilter from '../subComponentes/ButtonsFilter'
import styles from './styles.js'

const FilterPeoples = (props) => {
    return (
        <View style={{flex:1}}>
             <View style={{marginTop:40,height:30,paddingLeft:16}}>
                    <Text style={styles.textOption}>O que você busca?</Text>
                </View>
                <View style={{flex:1,alignItems:'center',marginTop:40,marginBottom:10}}>
                <ButtonsFilter 
                functionOption1={props.setMasculino}
                option1Atived={props.masculino}
                option1='HOMENS'
                functionOption2={props.setFeminino}
                option2Atived={props.feminino}
                option2='MULHERES'
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

export default FilterPeoples
