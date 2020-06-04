import React from 'react'
import { View, Text ,Dimensions,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const HeaderConfig = (props) => {
    return (
        <View>
             <View style={{
                    width:Dimensions.get('window').width/1,
                    height:Dimensions.get('window').height / 11.6,
                    backgroundColor:props.backgroundColor,
                    paddingLeft:16,
                    paddingRight:16,
                    justifyContent:'center'}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <TouchableOpacity onPress={props.onPressLeft}>
                            {props.IconLeft}
                            </TouchableOpacity>
                            {props.title ? <Text style={{color:'white',fontSize:20}}>{props.title}</Text> : null}                            
                            <TouchableOpacity onPress={props.onPressRight}>
                            {props.IconRight}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    )
}

export default HeaderConfig
