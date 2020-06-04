import React,{ Component } from 'react'
import { View, Text, ImageBackground,Image, FlatList, Dimensions,TouchableOpacity,Animated,PixelRatio} from 'react-native'
import FastImage from 'react-native-fast-image'
import EnviarMensage from '../subComponentes/EnviarMessage'

const sizePrice = PixelRatio.get()*10
class PostPhotos extends Component{
   
    state = {
        images : [],
        message : false,
        selectedIndex : 0,
    }
    
     setSelectedIndex = event => {
            const viewSize = event.nativeEvent.layoutMeasurement.width;
            const contentOffset = event.nativeEvent.contentOffset.x;
            const selectedIndex = Math.floor(contentOffset / viewSize);
            this.setState({ selectedIndex });
     }

    render(){
    const {selectedIndex} = this.state;
    return (
        <>
        <View style={{
        height:Dimensions.get('window').width/1.2,
        backgroundColor:'#FFF',
        borderBottomColor : '#ccc',
        borderBottomWidth:0.8}}>
         <View style={{
                position : 'absolute',
                top:18,
                left:'4%',
                zIndex:1,
                display:'flex',
                height:26,
                borderRadius : 8,
                paddingLeft:4,
                backgroundColor: this.props.valor < 500 ?"#540EAD" : this.props.valor >= 500 && 
                this.props.valor < 1000 ? '#E83D66' : this.props.valor >= 1000 ? "#B8A711" : "#051E0B",
                //backgroundColor:'rgba(52, 52, 52, 0.8)',
                alignItems:'center',
                justifyContent:'center'}}>
                {<Text style={{color:'#fff',fontSize:sizePrice}} >R${this.props.valor} </Text>}
                </View>
        <FlatList 
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={this.props.images}
        key={item=>item.value}
        onMomentumScrollEnd={this.setSelectedIndex}
        keyExtractor={item=>item.value}
        renderItem={({item})=>(
            <View>
                <TouchableOpacity 
                activeOpacity={1}
                onPress={this.props.toPost}
                >
                <FastImage
                    style={{ width:Dimensions.get('window').width/1, 
                    alignItems:'flex-end',
                    paddingRight:12,
                    paddingTop:12,
                    height:Dimensions.get('window').width/1.1,
                }}
                    source={{
                        uri: item.sucess,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
            >
               
                {this.props.postedPost && <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text>Carregando Fotos...</Text>
                </View>}
            </FastImage>
              </TouchableOpacity>          
            </View>
        )}
        />
        <EnviarMensage EnviarMensage={this.props.EnviarMensage}/>
        </View>
        <View style={{height:20,width:Dimensions.get('window').width,position:'absolute',bottom:160,display:"flex"
                ,flexDirection:'row',alignItems:'center',justifyContent:'center'
                }}>
                    {this.props.images.map((image, i)=>(
                        <View key={image.value} style={{
                            height:8,
                            width:8,
                            borderRadius : 12,
                            backgroundColor:'#f2f2f2',
                            margin:4,
                            opacity :  i === selectedIndex ? 0.9 : 0.5
                            }}>
                                <Text>{image.uri}</Text>
                        </View>
                    ))}
                </View>
    </>
    )}
}

export default PostPhotos
