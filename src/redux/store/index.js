import { createStore,applyMiddleware } from 'redux';
import reducers from '../ducks/index';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
const sagaMiddleware = createSagaMiddleware() ;
const store =  createStore(reducers, {}, applyMiddleware(ReduxThunk));

//sagaMiddleware.run(rootSaga);
export default store; 

