import React from 'react'
import { View, Text,Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
const Header = (props) => {
    return (
        <View>
             <View style={{
                    width:Dimensions.get('window').width/1,
                    height:Dimensions.get('window').height / 11.6,
                    backgroundColor:props.backgroundColor,
                    paddingLeft:16,
                    justifyContent:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon size={28} name='left' style={{color:props.color || 'white',marginRight:20}} onPress={props.back}/>
                        <Text style={{color:props.color || 'white',fontSize:20}}>{props.title}</Text>
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:12}}>
                        <Text style={{fontSize:18,color:'white'}}>{props.right} </Text>
                        </View>
                        </View>
                    </View>
                </View>
    )
}

export default Header
