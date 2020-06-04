import React from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import TypeQuarto from './TypeQuarto'
import QtdBanheiros from './QtdBanheiros'
import Preferences from './Preferences'
import Qtdpessoas from './Qtdpessoas'
import ValuePost from './ValuePost'
import ValueMensal from './ValueMensal'
import Comodies from './Comodies'
import Descricao from './Descricao'
import QtdVagas from './QtdVagas'
import style from './Styles'
import ButtonOption from '../../subComponentes/ButtomOption'
import Quartos from './Quartos'
import QuartoSuite from './QuartoSuite'
import TipoImovel from './TipoImovel'
const Informations = (props) => {
    return (
        <View style={{flex:1}}>
        
        <View style={[{flex:1},style.container]}>
            <View  style={{flex:1,padding:16}}//criada pra controlar o padding apenas de algumas informations e evitar que a descrição fique comprimida
            >
            <View style={{marginBottom:40}}>
            <Text style={[style.topico,{fontSize:20}]}>Fale um pouco sobre {props.type === 'compartilhada' ? 'sua vaga' : 'seu imóvel'}</Text>
            <Text style={{textAlign:'left'}}>(Informações sobre sua vaga é muito importante para quem deseja encontrar um bom local para morar)</Text>
            </View>
            {props.type === 'compartilhada' ? <TypeQuarto/> : null}
            {props.type === 'compartilhada' ? <Preferences /> : null}
            {props.type === 'compartilhada' ? <Qtdpessoas /> : null}
            {props.type === 'compartilhada' ? <QtdVagas /> : null}
            {props.type === 'completa' ? <TipoImovel/> : null}
            <QtdBanheiros />
            {props.type === 'completa' ? <Quartos/> : null}
            <QuartoSuite />
            <ValuePost/>
            {props.type === 'compartilhada' ? <ValueMensal/> : null}
            <Comodies/>
            </View>
            <Descricao/>
            
        </View>
        </View>
    )
}

export default React.memo(Informations)
