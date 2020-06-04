import React,{useState} from 'react'
import { View, Text,Alert, Dimensions ,PixelRatio,StatusBar} from 'react-native'
import { useSelector, useDispatch} from 'react-redux';
import { verifyNumber,setPhone} from '../../redux/ducks/Register'

import PhoneNumberComponent from '../../components/RegisterUsers/PhoneNumber';

import { isValid } from '../../ControllersView/Controller'
function PhoneNumber(props){
    const [showModal,setModal] = useState(false);
    const dispatch = useDispatch();
    const phone = useSelector(state => state.register.user.phone);
    const fonteSizeMaior = PixelRatio.get() * 14;
    const params = props.navigation.state.params;

    async function mostraModal(){
        let isValido = await isValid(phone);
        if(isValido){
            setModal(true)
        }else{
            setModal(false);
            Alert.alert('Ops!!!','Por favor,digite um número válido!');
        }
    }

    async function enviarSms(){
        props.navigation.navigate('ConfirmarCodigo',{userId : params.userId});
        setModal(false);
        const unmasked = phoneField.getRawValue();
        let isValido = await isValid(phone);
        let telefone = `+55${unmasked}` //adiciono ao numero o +55
        dispatch(setPhone(telefone));
        if(isValido){
          //https://us-central1-aplu-d36af.cloudfunctions.net/confirmarNumber
           dispatch(verifyNumber(telefone,false));
           props.navigation.navigate('ConfirmarCodigo',{userId : params.userId});
        }
    }

    return (
        <View style={{flex:1}}>
            <StatusBar barStyle='light-content' backgroundColor='#57CF87' />
            <View style={{flex:1,alignItems:'center',paddingTop:40}}>
            <View style={{
                height:Dimensions.get('window').height/10,
                backgroundColor:'#FFF',
                width:Dimensions.get('window').width/1,
                paddingLeft:14
                }}>
                    <Text 
                    style={{
                        textAlign:'left',
                        fontSize:fonteSizeMaior+2,
                        fontWeight:'bold',
                        color:'#051E0B'
                        }}>Verificação de Número
                    </Text>
                </View>
            <PhoneNumberComponent
            phone={phone}
            function={()=>mostraModal()}
            showModal={showModal}
            setPhone={(text)=>dispatch(setPhone(text))}
            enviarSms={()=>enviarSms()}
            Cancel={()=>setModal(false)}
            onDismiss={()=>setModal(false)}
            />
            
             </View>
        </View>
    )
}

export default React.memo(PhoneNumber);
