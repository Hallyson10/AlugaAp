import React from 'react';
import { View,TouchableOpacity,Dimensions } from 'react-native';
import ImagePosts from '../../components/subComponentes/ImagePosts'
const PostComponent = (props) => {
  return (
    <>
        <TouchableOpacity 
        activeOpacity={1}
        onPress={props.toPost}
        >
        <View style={{backgroundColor:props.disponivel && !props.premiumAnunciante && !props.visitantePremmium ||
            !props.disponivel ? 'black' : "#F2F2F2"}}>
            <ImagePosts
                anuciante ={props.anuciante}
                disponivel={props.disponivel}
                premiumAnunciante={props.premiumAnunciante}
                visitantePremmium={props.visitantePremmium}
                uri={props.uri}
            />
        </View>
        </TouchableOpacity>          
        </>
  )
}

export default React.memo(PostComponent);