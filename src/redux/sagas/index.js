import { all, fork } from 'redux-saga/effects';
import { FindPost } from '../ducks/Post'

export default function* root(){
    yield all([
        FindPost()
      ])
}