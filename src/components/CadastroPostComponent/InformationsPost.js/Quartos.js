import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text } from 'react-native'
import AdicionarBotoes from './AdicionarBotoes'
import {incrementQuarto,decrementQuarto} from '../../../redux/ducks/Posts/CadastroPost'
function Quartos(props){
    const qtdQuarto = useSelector(state => state.post.post.qtdQuarto);
    const dispatch = useDispatch();
    return(
        <AdicionarBotoes 
        incremento={()=>dispatch(incrementQuarto())}
        decremento={()=>dispatch(decrementQuarto())}
        title='Quartos' qtd={qtdQuarto} />
        
    )
}
export default Quartos