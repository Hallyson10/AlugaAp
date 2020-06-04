import types from './Types'


const initialState = {
    post : {
        idAutor : '',
        createAt : new Date().getTime(),
        endereco : {
            cep : '',
            cidade : '',
            estado : '',
            bairro : '',
            rua : '',
            numEndereco : '',
            long : '',
            lat : ''
        },
        images : [],
        cidadeComparator : '',
        descricao : 'kkk',
        preferenciaSexo : '',
        compartilhada : false,
        completa : false,
        individual : false,
        sala : false,
        disponivel : true,
        valor : '',
        countLikes:0,
        countComments: 0,
        vagaId : '',
        statusUrgente : false,
    }
}
export function tipoVaga(tipoVaga){
    if(tipoVaga === 'individual'){
        return dispatch => {
            dispatch({type : types.TIPOVAGAINDIVIDUAL, payload : true})
        }
    }else if(tipoVaga === 'compartilhada'){
        return dispatch => {
            dispatch({type : types.TIPOVAGACOMPARTILHADA, payload : true})
        }
    }else if(tipoVaga === 'sala'){
        return dispatch => {
            dispatch({type : types.TIPOVAGASALA,payload : true})
        }
    }
}
export function tipoSexoPreferencia(tipoSexo){
    //'H','M','T'
    return dispatch => {
        dispatch({type : types.SETSEXOPREFERENCIA, payload : tipoSexo})
    }
}
export function incrementQtdVagas(){
    return dispatch => {
        dispatch({type:types.INCREMENTQTDVAGAS})
    }
}
export function decrementQtdVagas(){
    return dispatch => {
        dispatch({type:types.DECREMENTQTDVAGAS})
    }
}
export function incrementQtdPessoas(){
    return dispatch => {
        dispatch({type : types.INCREMENTQTDPESSOASMORANDO})
    }
}
export function decrementQtdPessoas(){
    return dispatch => {
        dispatch({type : types.DECREMENTQTDPESSOASMORANDO})
    }
}
export function incrementQtdBanheiros(){
    return dispatch => {
        dispatch({type : types.INCREMENTQTDBANHEIROS})
    }
}
export function decrementQtdBanheiros(){
    return dispatch => {
        dispatch({type : types.DECREMENTQTDBANHEIROS})
    }
}
export function valorAluguel(valor){
    return dispatch => {
        dispatch({type : types.VALORALUGUEL, payload : valor})
    }
}
export function valorIndividual(valor){
    return dispatch => {
        dispatch({type : TypesCadPost.VALORINDIVIDUAL, payload : valor})
    }
}

export function incrementQuarto(){
    return dispatch => {
        dispatch({type : types.INCREMENTQUARTOS})
    }
}
export function decrementQuarto(){
    return dispatch => {
        dispatch({type : types.DECREMENTQUARTOS})
    }
}
export function incrementQuartoSuite(){
    return dispatch => {
        dispatch({type : types.INCREMENTQUARTOSUITE})
    }
}
export function decrementQuartoSuite(){
    return dispatch => {
        dispatch({type : types.DECREMENTQUARTOSUITE})
    }
}
export function setGeladeira(){
    return dispatch => {
        dispatch({type : types.TIPOGELADEIRA});
    }
}
export function setAgua(){
    return dispatch => {
        dispatch({type : types.TIPOAGUA});
    }
}
export function setEnergia(){
    return dispatch => {
        dispatch({type : types.TIPOENERGIA});
    }
}
export function setGaragemM(){
    return dispatch => {
        dispatch({type : types.TIPOGARAGEMMOTO});
    }
}
export function setGaragemC(){
    return dispatch => {
        dispatch({type : types.TIPOGARAGEMCARRO});
    }
}
export function setFogao(){
    return dispatch => {
        dispatch({type : types.TIPOFOGAO});
    }
}
export function setForrado(){
    return dispatch => {
        dispatch({type : types.TIPOFORRADO});
    }
}
export function setCeramica(){
    return dispatch => {
        dispatch({type : types.TIPOCERAMICA});
    }
}
export function setAnimais(){
    return dispatch => {
        dispatch({type : types.TIPOANIMAL});
    }
}
export function setWifi(){
    return dispatch => {
        dispatch({type : types.TIPOWIFI});
    }
}
export function setDescricao(descricao){
    return dispatch=>{
        dispatch({type : types.SETDESCRICAO,payload : descricao});
    }
}
export function setTipoImovel(tipo){
    return dispatch => {
        dispatch({type:types.TIPOIMOVEL,payload:tipo})
    }
}