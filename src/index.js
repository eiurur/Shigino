import React from 'react';
import { render } from 'react-dom';
import { IndexRedirect, IndexRoute, Redirect, Link, Router, Route, browserHistory } from 'react-router';
import App from './modules/App';
import MainContainer from './modules/MainContainer/MainContainer';
import RankingContainer from './modules/RankingContainer/RankingContainer';
import Moment from './modules/Moment/Moment';

import './reset.scss';
import './index.scss';

render((
  <Router
  onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainContainer}/>
      <Route path="/ranking/:term" component={RankingContainer}/>
      <Route path="/moment/:moment_id" component={Moment}/>
      <Route path="/user/@:username" component={MainContainer}/>
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.getElementById('app'));
