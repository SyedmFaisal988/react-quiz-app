import {createStore} from 'redux';
import rootReducer from './Reducers/RootReducer';

const Store = createStore(rootReducer, {});
export default Store;