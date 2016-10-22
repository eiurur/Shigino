import React from 'react';
import { Link } from 'react-router';
import style from './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul role="nav">
            <li className={style.item}><Link to="/main"  className={style.link} activeClassName="active">Chika</Link></li>
            <li className={style.item}><Link to="/main"  className={style.link} activeClassName="active">Main</Link></li>
            <li className={style.item}><Link to="/ranking/day"  className={style.link} activeClassName="active">Day</Link></li>
            <li className={style.item}><Link to="/ranking/week"  className={style.link} activeClassName="active">Week</Link></li>
            <li className={style.item}><Link to="/ranking/month"  className={style.link} activeClassName="active">Month</Link></li>
          </ul>
        </nav>
        <div className={style.container}>
          {this.props.children}
        </div>
      </header>
    );
  }
}
