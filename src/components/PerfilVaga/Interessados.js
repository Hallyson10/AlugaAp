import React,{useState} from 'react';
import { View,Text,Dimensions,FlatList,StyleSheet,PixelRatio } from 'react-native';
import Circle from './Circle'
import styles from './styles'
const { width , height } = Dimensions.get('window');
const sizeText = PixelRatio.get();

const Interessados = (props) => {
    
  return (
    <>
    <View style={{height:height/3.4,marginTop:10,maxHeight:height/3.4,justifyContent:'center',}}>
    <View>
    <Text style={styles.textPrincipais}>Interessados</Text>
    <View style={{height : height/3.6}}>
    <FlatList
        data={props.data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.userId}
        renderItem={({item,index})=>(
            <Circle key={item.userId} uri={item.user.fotosPerfil.uri}/>
        )}
    />
    </View>
    </View>
    </View>
    </>
  )
}

export default Interessados;