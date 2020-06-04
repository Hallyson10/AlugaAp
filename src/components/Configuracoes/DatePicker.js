import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import {DatePicker} from 'native-base';
import styles from '../PerfilUsuario/styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Idade} from '../../ControllersView/Controller'
const PickerDate = (props) => {
    function setDate(newDate) {
        const date = {
            dia : newDate.getDate(),
            mes : newDate.getMonth()+1,
            ano : newDate.getFullYear()
        }
      props.setData(date);
      let response = Idade(date);
      props.setIdade(response);  
  };

    function renderDatePicker(){
        return(
          <DatePicker
          defaultDate={new Date(1998, 4, 4)}
          minimumDate={new Date(1990,1,1)}
          maximumDate={new Date()}
          locale={"pt"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText={`${props.dataNascimento.dia}/${props.dataNascimento.mes}/${props.dataNascimento.ano}`}
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: '#051E0B' }}
          onDateChange={setDate}
          disabled={false}
          />
        )
    }
    return (
        <View>
        <Text style={styles.subTexts}>Data Nascimento</Text>
        <View style={[styles.containerOptions,{
            width : Dimensions.get('window').width / 1.1,
            backgroundColor:'#FFF',
            alignItems:'center',justifyContent:'center',borderColor:props.errorData ? 
        "#E83D66" : '#F0FFF0'
        }]}>
               { renderDatePicker()}
        </View>
        {props.errorData ? <Text style={{color:"#E83D66",textAlign:'center'}}>Selecione sua data de nascimento</Text> : null}
        </View>
    )
}

export default PickerDate
