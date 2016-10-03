import React from 'react';
import { render } from 'react-dom';
import { IndexRedirect, Redirect, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import MomentContainer from './modules/MomentContainer/MomentContainer';

import './reset.scss';
import './index.scss';

render((
  <Router history={browserHistory}>
    <Route name="App" path="/" component={App}>
      <IndexRedirect to="/lists" />
      <Route path="/lists" component={MomentContainer}/>
      <Route path="/user/@:username" component={MomentContainer}/>
      <Route path='/lists/' component={MomentContainer}>
    </Route>
  </Router>
), document.getElementById('app'));
