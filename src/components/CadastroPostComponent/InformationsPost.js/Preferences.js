import React from 'react'
import { View, Text } from 'react-native'
import ButtonRoundOptions from '../../subComponentes/ButtonRoundOptions'
import style from './Styles'
import { useSelector, useDispatch } from 'react-redux'
import { tipoSexoPreferencia } from '../../../redux/ducks/Posts/CadastroPost'

const Preferences = () => {
    const preferenciaSexo = useSelector(state => state.post.post.preferenciaSexo);
    const dispatch = useDispatch();
    return (
        <View style={style.container} >
            <Text style={[style.topico,style.topicosEspeciais]}>Prefêrencia</Text>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-around',
                alignItems:'center'
                }}>
                    <ButtonRoundOptions 
                    preference='Mulher' 
                    ativo={preferenciaSexo === 'M' ? true : false} 
                    onPress={()=>dispatch(tipoSexoPreferencia('M'))}
                    />
                    <ButtonRoundOptions 
                    preference='Homem' 
                    ativo={preferenciaSexo === 'H' ? true : false}
                    onPress={()=>dispatch(tipoSexoPreferencia('H'))}
                    />
            </View>
        </View>
    )
}

export default Preferences
