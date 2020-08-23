import { StyleSheet ,Dimensions,PixelRatio} from 'react-native'

export default styles = StyleSheet.create({
    namesDestaque : {
        fontFamily : 'Play-Bold',
        fontWeight : 'bold',
        fontSize:PixelRatio.get() * 10, 
        textAlign:'center',
        opacity : 0.9,
    },
    subNames : {
        fontWeight : 'normal',
        fontSize : 14,
        fontFamily : 'Play-Bold',
    },
    sub : {
        fontWeight : 'normal',
        fontSize : 12,
        fontFamily : 'Play-Bold',
    },
    cabecalho : {
        borderTopWidth:0.4 ,
        borderTopColor:'#ccc',
        height:Dimensions.get('window').height/11,
        borderBottomColor:'#ccc',
        flexWrap:'wrap',
        borderBottomWidth:0.8,
        backgroundColor:'#FFF',justifyContent:'center',
        paddingLeft:12,paddingRight:12}
})