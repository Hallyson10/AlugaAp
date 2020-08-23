import React, { Component,useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ativaModalProfile,desativaModalProfile  } from '../../redux/ducks/PeoplesSearching'
import UserCard from '../../components/UsersProcurandoComponent/UserCard'
import { FindPeoplesSearching } from '../../redux/ducks/PeoplesSearching'
import ModalButton from '../../components/ModalUsersSearching/ModalButtom'

 function PeoplesSearching (props){
    const colegasSearching = useSelector(state => state.peopleSearching.colegasSearching);
    let userSearchModal = useSelector(state => state.peopleSearching.userSearchModal);
    let isVisibleModalProfile = useSelector(state => state.peopleSearching.isVisibleModalProfile)
    const dispatch = useDispatch();
    function onRefresh(){
        dispatch(FindPeoplesSearching())
    }
    
    function cabecalho(){
        return(
            <View style={{paddingLeft:16,backgroundColor:'#fff',paddingRight:14}}>
                     <Text style={{
                         marginBottom:40,
                         fontSize:20,
                         color:'#52C796',
                         fontWeight:'bold',
                         paddingBottom:10,
                         borderBottomWidth:0.4,
                         borderBottomColor :'#ccc'                      
                          }}>
                         Encontre agora colegas para compartilhar moradia e despesas.</Text>
                     </View>
        )
    }
        return (
            <View style={{
                backgroundColor:'#fff',
                justifyContent:'center',
                paddingTop:10,
                borderTopWidth:0.4,
                borderTopColor:'#ccc',
                flex:1
                }}>
                
                {colegasSearching.length !== 0 ? 
                <FlatList
                ListHeaderComponent={()=>cabecalho()}
                numColumns={props.horizontal ? 0 : 2}
                horizontal={props.horizontal}
                onRefresh={()=>onRefresh()}
                refreshing={false}
                style={{backgroundColor:'#fff'}}
                data = {colegasSearching}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                key={item=>item.idUnique}
                renderItem={({ item }) => 
                <View style={{flex:1,alignItems:'center'}}>
                <UserCard onPress={()=>dispatch(ativaModalProfile(item))} item={item} />
                </View>
            
            }
                keyExtractor = {item => item.idUnique}
                /> : <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('FormPeoplesSearchingMain')}>
                    <Text>Eu estou buscando</Text>
                    </TouchableOpacity>
                    <Text>Não tem colegas buscando na sua cidade</Text>
                </View> }
                <ModalButton 
                isVisibleModalProfile={isVisibleModalProfile}
                close={()=>dispatch(desativaModalProfile())}
                userSearchModal={userSearchModal} />
            </View>
        )
}
export default React.memo(PeoplesSearching)