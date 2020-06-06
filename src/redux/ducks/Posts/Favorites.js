import firebase from '../../../Service/index'
const db = firebase.firestore();

const initialState = {
    favoritaramPost : [],
    loadFavoritaram : false
}


export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'SETFAVORITARAM': return{
            ...state,
            favoritaramPost : action.payload
        }
        case 'LOADFAVORITARAM' : return {
            ...state,
            loadFavoritaram : action.payload
        }
        break;
        default:
              return state;
    }
}

export function BuscarUsersFavoritaram(vagaId){
    return dispatch => {
        try {
            dispatch({type : 'LOADFAVORITARAM',payload : true})
            async function busca(){
                let find = await db.collection('favoritaramVaga')
                .doc(vagaId)
                .collection('usersFavoritaram')
                .get();
                let response = await Promise.all(find.docs.map(async(item)=>{
                        let data = item.data();
                        let user = await finduser(data.userId);
                        data.user = user;
                        return data;
                }))
                dispatch({type : 'SETFAVORITARAM',payload : response})
                dispatch({type : 'LOADFAVORITARAM',payload : false})
            }
            busca();
        } catch (error) {
            dispatch({type : 'LOADFAVORITARAM',payload : false})
        }
    }
}
export function BuscarMyVagasFavorites(userId){
    return async dispatch => {
        try {
            let find = await (await db.collection('myFavoritesVagas').doc(userId).collection('VagasFavorites').get()).docs
            let response = await Promise.all(
                find.map(async(item)=>{
                let resul = item.data()
                    let findVaga = await db.collection('vagasCompartilhadas').doc(resul.vagaId).get();
                    let resulVaga = await findVaga.data()
                    return resulVaga;
                })
            )
        } catch (error) {
            alert(JSON.stringify(error));
            return;
        }
    }
}
//busca e retorna todas as informações dos usuários
async function finduser(idAutor){
    console.log('entrou no busca autor')
    let refUser = await db.collection('users').doc(idAutor)
    let resul = await refUser.get()
    let response = await resul.data();
    return response.user
}
async function verifyUsersFavoritaram(vagaId,userId){
    let find = await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram')
    .where('userId','==',userId).get()

    if(find.docs.length === 0){
        return true;
    }else{
        return false;
    }
}

export function desfavoritarPost(vagaId,userId){
    return dispatch => {
       try {
        dispatch({type:"CLIQUEPOST"})
           async function desfavoritar(){
            await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram').doc(userId).delete()//remove o user de dentro do users favoritaram
            await db.collection('myFavoritesVagas').doc(userId).collection('VagasFavorites')
            .doc(vagaId).delete()//remove a vaga dos favoritos do usário
            dispatch({type:'CLIQUEPOSTZERO'});
           }
           desfavoritar();
           
       } catch (error) {
           
       }
    }
}
export function favoritarPost(vagaId,userId){
    console.log(userId)
        return dispatch => {
            dispatch({type:"CLIQUEPOST"})
            try {
                async function toFavorite(){
                    let findFavorite = await verifyUsersFavoritaram(vagaId,userId);
                    //await toFavoriteIncremento(vagaId,userId);//incrementa o countlikes

                    if(findFavorite){
                        //adiciona os usuários que favoritaram dentro do imóvel
                        await db.collection('favoritaramVaga').doc(vagaId).collection('usersFavoritaram').doc(userId)
                        .set({
                            userId,
                            date: new Date().getTime()
                        });
                        //adiciona o imóvel favorito nos favoritos do usuário
                        await db.collection('myFavoritesVagas').doc(userId).collection('VagasFavorites')
                        .doc(vagaId).set({
                            vagaId,
                            date: new Date().getTime()
                        })
                    }
                }
                toFavorite();
                dispatch({type:'CLIQUEPOSTZERO'});
            } catch (error) {
                console.log('erro ao favoritar post',error)
            }
        }
}
