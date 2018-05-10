import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SigninPage from './../components/auth/SigninPage';
import DocumentsPage from './../components/documents/DocumentsPage';
import NotFoundPage from './../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoadingPage from './../components/LoadingPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={LoadingPage} />
        <PublicRoute exact path="/signin" component={SigninPage} />
        <PrivateRoute exact path="/home" component={DocumentsPage} />
        <PrivateRoute exact path="/documents" component={DocumentsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
