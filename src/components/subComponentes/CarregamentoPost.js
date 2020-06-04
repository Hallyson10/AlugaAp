import React from 'react';
import { View ,Dimensions,ScrollView} from 'react-native';

// import { Container } from './styles';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
const {width ,height } = Dimensions.get('window')
export default function ReturnCarregamento(props){
  function renderItems(qtd){
    let array = []
        for(var i = 0 ; i < qtd; i++){
            array.push(
              <View key={i}>
                  <ShimmerPlaceHolder
                    
                    style={{height:height/11,width:width/1,marginBottom:1,marginTop:2}}
                    autoRun={true}
                    visible={!props.loadPosts}>
                  <ShimmerPlaceHolder
                    style={{height:height/14,width:width/6,borderRadius : 40}}
                    //colorShimmer={['#F0FFF0', '#57CF87', '#F0FFF0']}
                    autoRun={true}
                    visible={!props.loadPosts}/>
                      </ShimmerPlaceHolder>
                      <ShimmerPlaceHolder
                    style={{height:height/1.2,width:width/1 }}
                    autoRun={true}
                    visible={!props.loadPosts}>
                    
                      </ShimmerPlaceHolder>
                  </View>
            )
        }
        return(
          <>
            {array}
          </>
        )
  }
        return(
              <View style={{height:height,width:width}}>
              <ScrollView>
              { props.loadPosts && props.array.length === 0 ? renderItems(3) :
                renderItems(props.array.length)
              }
                </ScrollView>
              </View>
        )
}
