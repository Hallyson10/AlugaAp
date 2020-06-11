import React from 'react';
import { View,FlatList,TouchableOpacity } from 'react-native';
import ImagesPost from './ImagePosts'
const subComponentes = (props) => {
  return (
      <FlatList
          data={props.data}
          keyExtractor={item => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({item})=>(
            <TouchableOpacity 
            activeOpacity={1}
            style={{opacity: props.anuciante && !props.disponivel ? 0.4 : props.anuciante && props.disponivel ? 
            1 : props.disponivel 
            && !props.premiumAnunciante && !props.visitantePremmium ? 0.2 :
            !props.disponivel ? 0.1 : 1}}
            onPress={()=>props.navigation.navigate('ImageTelaGrande',{index : props.data.indexOf(item),images:props.data})}
            >
            <ImagesPost 
                uri={item.sucess}
            />
            </TouchableOpacity>
          )}
      />
  )
}

export default subComponentes;