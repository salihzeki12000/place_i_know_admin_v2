import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, createStructuredSelector } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { signInSuccess, signOut } from './actions/auth';
import { getAuthTokenDetails } from './helpers/signInActions.js';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.css';

export const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

const isUserSignedInOnBrowser = () => {
  const sessionKey = localStorage.getItem('adminAuthKey');
  if (sessionKey) {
    return true;
  }
  return false;
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));
registerServiceWorker();

const determinePathToRender = authState => {
  if (!!authState.user) {
    renderApp();
    history.push('/signin');
  } else if (!authState.user && isUserSignedInOnBrowser()) {
    renderApp();
    const authKey = localStorage.getItem('adminAuthKey');
    getAuthTokenDetails(authKey).then((user) => {
      store.dispatch(signInSuccess(user, authKey));
      history.push('/home');
    }).catch(() => {
      store.dispatch(signOut());
      history.push('/signin');
    });
  } else {
    renderApp();
    history.push('/');
  }
};

determinePathToRender(store.getState().auth);
