import styled from 'styled-components/native';

export const Body = styled.Modal`
`
export const BodyScroll = styled.ScrollView`
        background-color : #FFF;
`
export const BodyView = styled.View`
        justify-content : center;
        align-items : center;
        text-align : center;
        height : 100%;
        background-color : #FFF;
`
export const Figura = styled.Image`
        height : 50px;
        width : 50px;
`
export const TextVerification = styled.Text`
        font-size : 20px;
        color : #57CF87;
        font-weight: bold;
        font-family: Roboto;
        font-style: normal;
        text-align : center;
        max-width : 200px;
        margin-top : 40px
`
export const SubTextVerification = styled.Text`
        font-family: Roboto;
        text-align : center;
        font-style: normal;
        font-weight: 800;
        font-size: 16px;
        line-height: 16px;
        margin-top : 30px;
        color: #838B84;
        max-width : 320px;
        margin-right : 20px;
        margin-left : 20px;
`
export const TextOk = styled.Text`
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        color :#FFF;
`
export const TextButton = styled(TextOk)`
        color : #838B84
`
export const Button = styled.TouchableOpacity`
        height : 45px;
        min-width : 160px;
        max-width : 180px;
        padding:10px;
        background : ${props => props.theme};
        align-items : center;
        justify-content : center;
        margin-top : 50px;
        border-radius : 18px;
`
Button.defaultProps = {
        
                theme : '#57CF87',
        
       
}