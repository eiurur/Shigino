import React from 'react';
import {getParam, replaceParam} from 'url-params-helper';
import { Link } from 'react-router';
import style from './Pagination.scss';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('Pagination componentWillReceiveProps', nextProps);
    console.log('Pagination componentWillReceiveProps', nextProps.params);
    console.log('Pagination componentWillReceiveProps', this.state);
    // if(nextProps.count === undefined) return;
    this.setState({
      currentPage: getParam('currentPage') - 0 || 1,
      pageSize: Math.ceil(nextProps.count / 30),
    });
  }

  render() {
    const prevUrl = replaceParam('currentPage', this.state.currentPage - 1);
    const nextUrl = replaceParam('currentPage', this.state.currentPage + 1);
    return (
      <div className={style.container}>
        <Link className={style.arrow} to={`${prevUrl}`} style={this.state.currentPage - 1 <= 0 ? {pointerEvents: 'none'} : null}>＜</Link>
        {this.state.currentPage} / {this.state.pageSize}
        <Link className={style.arrow} to={`${nextUrl}`} style={this.state.currentPage + 1 > this.state.pageSize ? {pointerEvents: 'none'} : null}>＞</Link>
      </div>
    );
  }
}