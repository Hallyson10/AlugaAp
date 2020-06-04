import React from 'react';
import { 
    View, 
    Dimensions, 
    PixelRatio, 
    StyleSheet,
    Text,
    TextInput, 
    TouchableOpacity, 
    Picker } from 'react-native';
import {DatePicker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Idade } from '../../ControllersView/Controller/'

function RegisterUsers(props) {

    function picker(){
        return(
            <Picker
            selectedValue={props.escolaridade}
            style={{alignItems:'center',width:Dimensions.get('window').width/1.2,
            height:Dimensions.get('window').height/12,}}
            onValueChange={(itemValue, itemIndex) => props.setEscolaridade(itemValue)}
            >
                <Picker.Item label="Outros" value="Outros" />
                <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" />
                <Picker.Item label="Ensino Médio" value="Ensino Médio" />
                <Picker.Item label="Ensino Superior" value="Ensino Superior" />
                <Picker.Item label="Pós-graduada(o)" value="Pós-graduada(o)" />
            </Picker>
        )
    }

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
            placeHolderText={<Icon name='calendar-alt' size={28} />}
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: '#051E0B' }}
            onDateChange={setDate}
            disabled={false}
            />
          )
      }

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.textCabecalhoContainer}>Cidade Natal *</Text>
            <View style={[styles.containerOptions,{paddingLeft:4,
                borderColor : props.errorCidade ? "#E83D66" : '#F0FFF0'}]}>
                <TextInput
                style={[styles.textButton,{fontWeight:'normal'}]}
                value={props.cidadeNatal}
                onChangeText={(text)=>props.setCidadeNatal(text)}
                />
            </View>
           {props.errorCidade ?  
           <Text style={{color:"#E83D66",textAlign:'center'}}>Insira o nome da cidade onde você nasceu</Text> : null}
            <Text style={styles.textCabecalhoContainer}>Escolaridade</Text>
            <View style={styles.containerOptions}>
                {picker()}
            </View>
            <Text style={styles.textCabecalhoContainer}>Sexo *</Text>
            <View style={[styles.containerOptions,{flexDirection:'row',alignItems:'center',marginBottom:8,borderColor:props.errorSexo ? "#E83D66" : '#F0FFF0'}]}>
            <TouchableOpacity 
            onPress={props.setSexoM}
            style={{ flex:1, backgroundColor: props.sexo === 'H' ? '#57CF87' : '#FFF'}}>
                <View style={styles.buttonText}>
                    <Text style={styles.textButton}>Homem</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={props.setSexoF}
                style={{flex:1,backgroundColor: props.sexo === 'M' ? '#57CF87' : '#FFF'}}>
                <View style={styles.buttonText}>
                    <Text style={styles.textButton}>Mulher</Text>
                </View>
                </TouchableOpacity>
            </View>
            {props.errorSexo ? <Text style={{color:"#E83D66",textAlign:'center'}}>Selecione uma opção.</Text> : null}
            <Text style={styles.textCabecalhoContainer}>Data Nascimento *</Text>
            <View style={[styles.containerOptions,{alignItems:'center',justifyContent:'center',borderColor:props.errorData ? 
            "#E83D66" : '#F0FFF0'
            }]}>
                   { renderDatePicker()}
            </View>
            {props.errorData ? <Text style={{color:"#E83D66",textAlign:'center'}}>Selecione sua data de nascimento</Text> : null}
            
        </View>
        {props.errorIdade ? <Text style={{color:"#E83D66",textAlign:'center'}}>Você deve ter pelo menos 17 anos para se cadastrar.</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
    container : {
        height:Dimensions.get('window').height / 1.3,
        width:Dimensions.get('window').width/1.1,
        borderWidth:1,
        borderColor:'#F0FFF0',
        backgroundColor:'#F2F2F2',
        borderRadius:14,
        alignItems:'center',
        justifyContent:'center',
        padding : 1
    },
    containerOptions : {
        width:Dimensions.get('window').width/1.2,
        height:Dimensions.get('window').height/12,
        borderColor:'#F0FFF0',
        backgroundColor:'#FFF',
        borderWidth:1,
        marginBottom: 10,
        padding:0.1
    },
    textCabecalhoContainer : {
        margin : 2,
        fontWeight:'bold',
        fontSize : PixelRatio.get() * 11.2
    },
    buttonText:{
        alignItems:'center',
        justifyContent:'center',
        height:Dimensions.get('window').height/12.8,
    },
    textButton :{
        fontWeight:'bold',
        fontSize : PixelRatio.get() * 10.8
    }
})

export default React.memo(RegisterUsers)