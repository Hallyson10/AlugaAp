import { StyleSheet,Dimensions,PixelRatio } from 'react-native'

export default styles = StyleSheet.create({
    width : Dimensions.get('window').width / 1.1,
    texts :{
        margin:2,
        fontWeight:'normal',
        fontSize : PixelRatio.get() * 11.2,
        color:"#051E0B"
    },
    subTexts : {
            margin:2,
            fontWeight:'normal',
            fontSize : PixelRatio.get() * 10.8,
            color:"#828282"
    },
    containerOptions : {
        width:Dimensions.get('window').width/1.2,
        height:Dimensions.get('window').height/12,
        borderColor:'#F0FFF0',
        backgroundColor:'#FFF',
        borderWidth:1,
        marginBottom: 10,
        padding:0.1
    },
    textCabecalhoContainer : {
        margin : 2,
        fontWeight:'bold',
        fontSize : PixelRatio.get() * 11.2
    },
    buttonText:{
        alignItems:'center',
        justifyContent:'center',
        height:Dimensions.get('window').height/12.8,
    },
    textButton :{
        fontWeight:'bold',
        fontSize : PixelRatio.get() * 10.8
    }
})