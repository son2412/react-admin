import { createStore, applyMiddleware, Store } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/root.reducer';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import rootSaga from './sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
// middlewares.push(logger);
const store: Store = createStore(rootReducers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
// store.subscribe(() => {});
export default store;
