import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text } from 'react-native'
import AdicionarBotoes from './AdicionarBotoes'
import {incrementQuartoSuite,decrementQuartoSuite} from '../../../redux/ducks/Posts/CadastroPost'
function QuartoSuite(props){
    const qtdQuartoSuite = useSelector(state => state.post.post.qtdQuartoSuite);
    const dispatch = useDispatch();
    return(
            <AdicionarBotoes 
            incremento={()=>dispatch(incrementQuartoSuite())}
            decremento={()=>dispatch(decrementQuartoSuite())}
            title='Quartos suítes' qtd={qtdQuartoSuite} />
    )
}
export default QuartoSuite