import React from 'react';
import { render } from 'react-dom';
import { IndexRedirect, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import MomentContainer from './modules/MomentContainer/MomentContainer';
import History from './modules/History/History';

import './reset.scss';
import './index.scss';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/lists" />
      <Route path="/lists" component={MomentContainer}/>
      <Route path="/history" component={History}/>
    </Route>
  </Router>
), document.getElementById('app'));
