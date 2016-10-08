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
    this.url = '/api/tweets/moments';
  }

  componentDidMount() {
    console.log('MainContainer componentDidMount', this.props);
    const params = Object.assign(this.props.params, getParams());
    this.handleSubmit(params);
  }

  componentWillReceiveProps(nextProps) {
    console.log('MainContainer componentWillReceiveProps', nextProps.params);
    console.log('MainContainer componentWillReceiveProps getParams', getParams());
    const params = Object.assign(nextProps.params, getParams());
    this.handleSubmit(params);
  }

  handleSubmit(params = {}) {
    console.log('MainContainer handleSubmit', params);
      // this.context.history.push(replaceParam('username', params.username));

    axios({
      url: this.url,
      method: 'get',
      responseType: 'json',
      params: {
        username: params.username,
        word: params.word,
        skip: (params.currentPage - 1) * 30 || 0,
        limit: 30,
      }
    })
    .then( res => {
      console.log('MainContainer fetch ', res.data);
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
    console.log('MainContainer render ');
    return (
      <div className={style.container}>
        <SearchForm onWordSubmit={this.handleSubmit.bind(this)}></SearchForm>
        <MomentContainer moments={this.state.moments} count={this.state.count}></MomentContainer>
      </div>
    );
  }
}