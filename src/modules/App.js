import React from 'react';
import { Link } from 'react-router';
import style from './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul role="nav">
            <li className={style.item}><Link to="/"  className={style.link} activeClassName="active">Chika</Link></li>
            <li className={style.item}><Link to="/lists"  className={style.link} activeClassName="active">Lists</Link></li>
            <li className={style.item}><Link to="/history" className={style.link} activeClassName="active">History</Link></li>
          </ul>
        </nav>
        <div className={style.container}>
          {this.props.children}
        </div>
      </header>
    );
  }
}
