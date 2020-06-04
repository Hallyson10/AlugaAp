import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, FlatList, TouchableOpacity,Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { searchCidade, FilterPosts, ativaPesquisa } from '../../redux/ducks/Posts/Filters'
import {FindFilterPeoples} from '../../redux/ducks/PeoplesSearching'
const Index = (props) => {
    const optionsFind = useSelector(state => state.post.optionsFind);
    const userId = useSelector(state => state.profile.user.userId)
    const dispatch = useDispatch();
    //busco os nomes das cidades e os posts referentes ao nome da cidade
    function setNameCidade(cidade){
        try {
            dispatch(searchCidade(cidade));
          //dispatch(FindFilterPeoples(cidade));
          //dispatch(FilterPosts(cidade,userId));
            dispatch(ativaPesquisa(false));
            props.functionFilter(cidade);
            Keyboard.dismiss();

        } catch (error) {
            
        }
    }
    return (
        <View style={{flex:1,backgroundColor:'black'}}>
            <FlatList 
                data ={optionsFind}
                key={item=>item.cidade}
                renderItem = {({item})=>(
                        <View key={item=>item.cidade} style={{
                            height:46,
                            backgroundColor:'#F1EDED',
                            borderBottomWidth:1,
                            borderBottomColor:'#07000F',
                            justifyContent:'center',
                            paddingLeft:20
                            }}>
                                 <TouchableOpacity activeOpacity={1} 
                                 onPress={()=>setNameCidade(item.cidade)}>
                        <View
                        style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingRight:14
                        }}
                        >  
                        <Text 
                        key={item=>{item.cidade}} style={{fontSize:16}} 
                        onPress={()=>setNameCidade(item.cidade)}>{item.cidade}  {item.estado} 
                        </Text>
                        <Icon name='search' size={20} color='#07000F' />
                        </View>
                        </TouchableOpacity>
                        </View>
                )}
                keyExtractor={item=>item.cidade}/>
        </View>
    )
}

export default Index
