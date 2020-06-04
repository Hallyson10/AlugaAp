import React,{useState} from 'react'
import { View, Text, Dimensions, ScrollView, PixelRatio } from 'react-native'
import { useDispatch } from 'react-redux'
import Photo from '../ModalUsersSearching/Photo'
import ModalAddPhoto from './ModalAddPhoto'
import ViewEdicoes from './ViewEdicoes'
import ButtonNext from '../../components/subComponentes/ButtonNext'
import {selecionaFotos} from '../../redux/ducks/Register';
const EditProfile = (props) => {
    const [isVisible,setIsVisible] = useState(false);
    const dispatch = useDispatch();
    return (
        <View style={{flex:1}}>
        <ScrollView>
        <View style={{flex:1,alignItems: 'center',marginBottom:20}}>
            <View style={{
                height:Dimensions.get('window').height/8,
                width:Dimensions.get('window').width / 1,
                paddingLeft:14,
                justifyContent:'center',
                marginTop:20
                }}>
                <Text style={{fontSize:PixelRatio.get()*14,fontWeight:'bold',color:'#051E0B'}}>Informações básicas</Text>
                <Text style={{fontWeight:'normal',color:'#051E0B'}}>(Informações de perfil ajudam a ter boa aceitação pelas pessoas).</Text>
            </View>
            <View style={{marginBottom:20,marginTop:20}}>
            <Photo 
            isPerfil
            photo={props.photo}
            username={props.username}
            onPress={()=>{setIsVisible(true)}}
            idade = {props.idade}
            />
            </View>
            <ViewEdicoes
            escolaridade={props.escolaridade}
            sexo={props.sexo}
            cidadeNatal={props.cidadeNatal}
            setEscolaridade={props.setEscolaridade}
            setData={props.setData}
            setIdade={props.setIdade}
            setCidadeNatal={props.setCidadeNatal}
            setSexoM={props.setSexoM}
            setSexoF={props.setSexoF}
            errorCidade={props.errorCidade}
            errorSexo={props.errorSexo}
            errorData={props.errorData}
            errorIdade={props.errorIdade}
            />
            <ButtonNext 
            title='Finalizar'
            onPress={props.onPress}
            disabled={props.disabled}
            />
            <ModalAddPhoto
            isVisible={isVisible}
            selecionaFotos={(fotos)=>dispatch(selecionaFotos(fotos))}
            onSwipeComplete={()=>setIsVisible(false)}
            />
        </View>
        
        </ScrollView>
        </View>
    )
}

export default EditProfile
