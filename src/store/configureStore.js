import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import authReducer from './../reducers/auth';
import chatReducer from './../reducers/chat';
import tripReducer from './../reducers/trip';
import activeTripReducer from './../reducers/activeTrip';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      trips: tripReducer,
      activeTrip: activeTripReducer,
      chat: chatReducer,
      form: formReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
