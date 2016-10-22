import React from 'react';
import axios from 'axios';
import {getParams, replaceParam} from 'url-params-helper';
import MomentContainer from '../MomentContainer/MomentContainer';
import style from './RankingContainer.scss';

export default class RankingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moments: [],
      count: 0,
      err: null
    };
    this.url = '/api/tweets/moments/ranking';
  }

  componentDidMount() {
    console.log('RankingContainer componentDidMount', this.props);
    const params = Object.assign(this.props.params, getParams());
    this.handleSubmit(params);
  }

  componentWillReceiveProps(nextProps) {
    console.log('RankingContainer componentWillReceiveProps', nextProps.params);
    console.log('RankingContainer componentWillReceiveProps getParams', getParams());
    const params = Object.assign(nextProps.params, getParams());
    this.handleSubmit(params);
  }

  handleSubmit(params = {}) {
    console.log('RankingContainer handleSubmit', params);
      // this.context.history.push(replaceParam('username', params.username));

    axios({
      url: `${this.url}/${params.term}`,
      method: 'get',
      responseType: 'json',
      params: {
        skip: (params.currentPage - 1) * 30 || 0,
        limit: 30,
      }
    })
    .then( res => {
      console.log('RankingContainer fetch ', res.data);
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
    console.log('RankingContainer render ');
    return (
      <div className={style.container}>
        <MomentContainer moments={this.state.moments} count={this.state.count}></MomentContainer>
      </div>
    );
  }
}