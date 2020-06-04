import { combineReducers } from 'redux';

import auth from './Auth';
import register from './Register'
import post from './Post'
import peopleSearching from './PeoplesSearching'
import profile from './Profile'
import mensagem from './EntrarEmContato/Mensagem'
import filter from './Posts/Filters'
import favorite from './Posts/Favorites'
import editarperfil from './Configuracoes/EditarPerfil'
import meusposts from './MeusPosts/index'
export default combineReducers({
  auth,
  register,
  profile,
  post,
  peopleSearching,
  mensagem,
  filter,
  favorite,
  editarperfil,
  meusposts
});