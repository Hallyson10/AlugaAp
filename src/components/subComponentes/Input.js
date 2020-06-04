import React from 'react'
import { View, Text ,TextInput,Dimensions} from 'react-native'

function Input(props){
    return (
        <View style={[
        props.flex ? {
        height:props.height ? props.height : 80,
        width : props.width ? props.width : 90,
        //flex:1,
        paddingLeft:2,
        marginBottom:16,
        paddingRight:14}:
        {
        height:props.height ? props.height : 80,flex:1 ,
        paddingLeft:14,
        marginBottom:16,
        paddingRight:14
        }]}>
           <Text style={{marginBottom:10,fontSize:16,fontWeight:'bold',color:'#57CF87'}}> {props.title} </Text>
           <View style={props.erro ? {
            height:props.height ? props.height : 50,
            paddingLeft:12,
            //backgroundColor:'#F0EDED',
            backgroundColor: 'rgba(161, 229, 188, 0.1)',
            borderColor:'red',
            borderRadius:12,
            borderWidth:0.8
           } : {
            height:props.height ? props.height : 50,
            paddingLeft:12,
            //backgroundColor:'#F0EDED',
            backgroundColor: 'rgba(161, 229, 188, 0.1)',
            borderColor:'#57CF87',
            borderRadius:12,
            borderWidth:0.8
            }}>
                <TextInput 
                style={{flex:1,color:'#07000F',fontSize:18}}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                value={props.value} 
                multiline={props.multiline}
                onChangeText={props.onChangeText}
                onEndEditing={props.onEndEditing} 
                editable={props.editable}
                />
                </View>
        </View>
    )
}

export default Input
