import React,{useState,useEffect} from 'react'
import { View, Text, Dimensions, TouchableOpacity,ImageBackground,PixelRatio } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

function Photo(props){
    let colors = ['#A1E5BC','#00702D','#7CE5A6','#57CF87'];
    const [image,setImage] = useState('');
    function renderPhoto(photo){
        try {
            return (
                <FastImage
            source={{uri:photo ? photo : '',headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,}}
                        resizeMode={FastImage.resizeMode.contain}

            resizeMode='cover'
            imageStyle={{
            borderRadius:360,
            borderWidth:2,
            borderColor: colors[Math.floor(Math.random() * 3)],
            marginBottom:6,
            
            }}
            style={{
                height: Dimensions.get('window').height/5.8,
                width: Dimensions.get('window').width/3.6,
                alignItems:'center',
                justifyContent: 'center',
            }}
                        >
                                {props.isPerfil && props.photo ? 
    
                                <Text style={{color:"#B8E5CA"}}>Editar</Text> 
                                : 
                                props.isPerfil && !props.photo ?
                                
                                <Icon name='camerao' size={28} color="#B8E5CA"/>
                                
                                : null}
                        </FastImage>
            )
        } catch (error) {
            return(
                <View/>
            )
        }
    }
    try {
        return (
            <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={props.onPress}>
            {renderPhoto(props.photo)}
                        </TouchableOpacity>
                        <Text 
                        style={{
                        fontSize:14,
                        fontWeight:'bold',
                        color:'#051E0B'}}>{props.username.split(' ').slice(0, 2).join(' ')}, {props.idade} </Text>
                        </View>
        )
    } catch (error) {
        return(
            <View></View>
        )
    }
}
Photo.defaultProps = {
    username: ''
};
export default Photo
