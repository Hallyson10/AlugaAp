import React from 'react';
import { View,Dimensions,PixelRatio,Text,StyleSheet,TouchableOpacity } from 'react-native';
import styled from '../../colors'
const { width , height } = Dimensions.get('window');

const subComponentes = (props) => {
  return(
      <View style={{height: height / 4,width : width / 1.2,borderRadius:12,borderWidth:0.8,borderColor:styled.backgroundOption}}>
          <TouchableOpacity 
          onPress={props.functionOption1}
          style={[styles.bottomTop,{
        borderBottomColor : styled.backgroundOption,
        backgroundColor : props.option1Atived ? styled.backgroundOption : "#FFF"}]} >
                <Text style={[styles.textOption,
                {color : props.option1Atived ? "#FFF" : styled.backgroundOption}]}>{props.option1}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={props.functionOption2}
          style={[styles.bottomButton,{
          backgroundColor : props.option2Atived ? styled.backgroundOption : "#FFF"}]}>
          <Text style={[styles.textOption,
          {color : props.option2Atived ? "#FFF" : styled.backgroundOption,
          }]}>{props.option2}</Text>
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    bottomTop:{flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderTopEndRadius:12,
        borderTopLeftRadius:12,
        },
    bottomButton : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius :12,
        borderBottomRightRadius:12,
    },
    textOption : {
        fontSize : PixelRatio.get() * 11.8,
        fontWeight : 'bold',
        color : "#FFF"
    }

})
export default subComponentes;