import React from 'react'
import { View, Text, Dimensions, TouchableOpacity,ImageBackground,PixelRatio } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

function Photo(props){
    let colors = ['#A1E5BC','#00702D','#7CE5A6','#57CF87'];
    try {
        return (
            <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={props.onPress}>
            
            <ImageBackground
            source={{uri: props.photo}}
            resizeMode='cover'
            imageStyle={{
            borderRadius:360,
            borderWidth:2,
            borderColor: colors[Math.floor(Math.random() * 3)],
            borderRadius: 45,
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
                        </ImageBackground>
                        </TouchableOpacity>
                        <Text 
                        style={{
                        fontSize:PixelRatio.get()*13.8,
                        fontWeight:'bold',
                        color:'#051E0B'}}>{props.username.split(' ').slice(0, 2).join(' ')}, {props.idade} </Text>
                        </View>
        )
    } catch (error) {
        
    }
}
Photo.defaultProps = {
    username: ''
};
export default Photo
