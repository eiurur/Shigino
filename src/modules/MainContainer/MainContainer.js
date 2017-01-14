import React from 'react';
import axios from 'axios';
import {getParams, replaceParam} from 'url-params-helper';
import SearchForm from '../SearchForm/SearchForm';
import MomentContainer from '../MomentContainer/MomentContainer';
import style from './MainContainer.scss';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      moments: [],
      count: 0,
      err: null
    };
    this.url = '/api/moments';
  }

  componentDidMount() {
    const params = Object.assign(this.props.params, getParams());
    this.handleSubmit(params);
  }

  componentWillReceiveProps(nextProps) {
    const params = Object.assign(nextProps.params, getParams());
    this.handleSubmit(params);
  }

  handleSubmit(params = {}) {
    const url = (params.username) ? `${this.url}/@${params.username}` : this.url;
    axios({
      url: url,
      method: 'get',
      responseType: 'json',
      params: {
        word: params.word,
        skip: (params.currentPage - 1) * 30 || 0,
        limit: 30
      }
    })
    .then( res => {
      if(res.status !== 200) throw new Error(res.data);
      this.setState({
        moments: res.data.moments,
        count: res.data.count,
      });
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  render() {
    return (
      <div className={style.container}>
        <SearchForm onWordSubmit={this.handleSubmit.bind(this)}></SearchForm>
        <MomentContainer moments={this.state.moments} count={this.state.count}></MomentContainer>
      </div>
    );
  }
}