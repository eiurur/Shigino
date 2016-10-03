import React from 'react';
import { render } from 'react-dom';
import { IndexRedirect, Redirect, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import MainContainer from './modules/MainContainer/MainContainer';
import MomentContainer from './modules/MomentContainer/MomentContainer';

import './reset.scss';
import './index.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/main" component={MainContainer}/>
      <Route path="/lists" component={MomentContainer}/>
      <Route path="/user/@:username" component={MainContainer}/>
    </Route>
  </Router>
), document.getElementById('app'));
