import { StyleSheet,PixelRatio } from 'react-native'
const sizeText = PixelRatio.get();
export default styles = StyleSheet.create({
    textPrincipais : {
        fontSize : sizeText * 13.2,
        color : "#051E0B",
        fontWeight : '800',
        marginLeft : 18,
        marginBottom : 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})