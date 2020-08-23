import React from 'react';
import { View,Dimensions } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
const { height, width } = Dimensions.get('window')
const subComponentes = (props) => {
  return (
      <View style={{flex:1,backgroundColor:'#FFF'}}>
          <ShimmerPlaceHolder
                    style={{height:height/8,width:width/1,marginBottom:1,marginTop:2}}
                    autoRun={true}
                    visible={false}></ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                    style={{height:height/2,width:width/1,marginBottom:1,marginTop:2}}
                    autoRun={true}
                    visible={false}></ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                    style={{height:height/2,width:width/1,marginBottom:1,marginTop:2}}
                    autoRun={true}
                    visible={false}></ShimmerPlaceHolder>
      </View>
  )
}

export default subComponentes;