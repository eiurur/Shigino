import React from 'react';
import { render } from 'react-dom';
import { IndexRedirect, Redirect, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import MainContainer from './modules/MainContainer/MainContainer';
import RankingContainer from './modules/RankingContainer/RankingContainer';
import MomentContainer from './modules/MomentContainer/MomentContainer';

import './reset.scss';
import './index.scss';

render((
  <Router
  onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/main" component={MainContainer}/>
      <Route path="/ranking/:term" component={RankingContainer}/>
      <Route path="/lists" component={MomentContainer}/>
      <Route path="/user/@:username" component={MainContainer}/>
      <Redirect from="*" to="/main" />
    </Route>
  </Router>
), document.getElementById('app'));
