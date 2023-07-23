import { legacy_createStore as createStore ,applyMiddleware, combineReducers } from 'redux';
import usersReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  users: usersReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;