import React from 'react'
import { View, Text, Dimensions ,TouchableOpacity} from 'react-native'
import moment from 'moment'
import 'moment-timezone';
import 'moment/locale/pt-br';
moment.tz.setDefault('ISO');
moment.locale('pt-BR');
import FastImage from 'react-native-fast-image'
const { height , width } = Dimensions.get('window')
const CabecalhoInteressados = (props) => {
  
    renderImage = () => {
        try {
            return(
                <FastImage
                style={{ 
                width:60, 
                height:60,
                borderRadius : 30,
                backgroundColor:'#ccc',
                marginRight:4
             }}
                source={{
                    uri: props.image,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
        />
            )
        } catch (error) {
            return(
                    <View></View>
            )
        }
    }
    return (
        <View style={{
            flex:1,
            height:height/6,
            //backgroundColor:'#F0FFF0',
            paddingHorizontal:12,
            justifyContent:'center'}}>
                
                    <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:40}}>
                    {renderImage()}
                    <View style={{flexDirection:'row',alignItems:'center',
                    borderBottomColor:'#57CF87',
                    borderBottomWidth:0.8,minHeight:80,
                    marginRight:20}}>
                    <View style={{flex:2}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'#051E0B'}}> {props.username.split(' ').slice(0, 2).join(' ')} </Text>
                    <View style={{alignItems:'flex-start',marginTop:-2,paddingLeft:4}}>
                    <Text style={{fontSize:12,marginRight:2,textAlign:'left',color:'#838B84'}}> 
                    {props.titleInformation + moment(props.time).calendar()} </Text>
                    </View>
                    </View>
                    <View style={{flex:1,marginRight:14}}>
                    <TouchableOpacity 
                    style={{
                    width:width/3.6,height:height/14.2,
                    borderRadius:16,
                    backgroundColor:'#52C796',
                    alignItems:'center',
                    justifyContent:'center',
                    padding:4
                    }}
                    onPress={props.onPress} >
                    <Text style={{fontSize:14,color:'#FFF',fontWeight:'bold',textAlign:'center'}}>{props.title}</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    
            </View>
    )
}

export default CabecalhoInteressados
