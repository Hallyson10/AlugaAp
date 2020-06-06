import React,{useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, PixelRatio,TouchableOpacity } from 'react-native'
const fonteSizeMedio = PixelRatio.get()*11.6
const fonteSizeMaior = PixelRatio.get()*12.8
const InputRegister = React.forwardRef((props,ref)=>{
    
    return (
        <View style={{marginBottom:10,marginTop:10,marginRight:4}}>
        <View style={{marginBottom:14,width : Dimensions.get('window').width / 1.1,}}>
                <Text style={{fontSize:fonteSizeMaior,color:'#051E0B',fontWeight:'bold'}}>{props.title}</Text>
                {props.subTitle ? <Text style={{fontWeight:'900',textAlign:'left'}}>{props.subTitle}</Text> : null}
        </View>
        <View style={[styles.containerInput,
            {borderColor : props.error  ?  "#E83D66": "#F0FFF0",
            marginBottom: props.error  ? 12 : 4
            }]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <TextInput 
            ref={ref}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            autoCorrect={props.autoCorrect}
            returnKeyType={props.returnKeyType}
            onSubmitEditing={props.onSubmitEditing}
            style={{fontSize:fonteSizeMedio,fontWeight:'normal',flex:1}}
            autoFocus={props.autoFocus}
            value={props.value}
            onChangeText={props.onChangeText}
            onChange={props.onChange}
            autoCapitalize={props.autoCapitalize}
            />
            {props.senhaView ? <TouchableOpacity onPress={props.onPressMostrar}>
            <View style={{
            width:50,
            height : Dimensions.get('window').height / 12,
            width : Dimensions.get('window').width / 4.6,
            alignItems:'center',
            justifyContent:'center'
            }}>
                <Text style={{fontWeight:'bold',fontSize:fonteSizeMedio-6,marginRight:4}}>MOSTRAR</Text>
            </View>
            </TouchableOpacity> : null}
            </View>
           {props.error ? <Text style={{textAlign:'center',marginTop:4,color:"#E83D66"}}>
                {props.errorName}
            </Text> : null}
        </View>
        </View>
    )
})
const styles = StyleSheet.create({
    containerInput : {
        height : Dimensions.get('window').height / 12,
        width : Dimensions.get('window').width / 1.1,
        borderWidth: 1,
        backgroundColor:'#F2F2F2',
        paddingLeft:10,
        borderRadius:30
    }
})
export default InputRegister
