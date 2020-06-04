import { StyleSheet,Dimensions } from 'react-native'
const { width , height } = Dimensions.get('window')
export default styles = {
    textOption : {
        color : '#57CF87',
        fontSize : 21,
        fontWeight : 'bold'
    },
    buttonFilter:{
        height : height/12,
        width : width / 1.4,
        borderRadius : 14,
        backgroundColor : '#57CF87',
        alignItems : 'center',
        justifyContent : 'center'
    },
    titleFilter:{
        color : '#FFF',
        fontSize : 21,
        fontWeight : '800'
    }
}