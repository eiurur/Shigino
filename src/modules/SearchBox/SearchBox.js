import React from 'react';
import axios from 'axios';
import SearchForm from '../SearchForm/SearchForm';
import style from './SearchBox.scss';

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      err: null
    };
    this.url = '/api/illusts';
  }

  clearState() {
    this.state = {
      images: [],
      err: null
    };
  }

  handleUrlSubmit(url) {
    this.clearState();

    axios({
      url: this.url,
      method: 'get',
      responseType: 'json',
      params: {
        url: url
      }
    })
    .then( res => {
      if(res.status !== 200) throw new Error(res.data);
      this.setState({images: res.data.images});
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  // ページを読み込んだときに呼ばれる
  componentDidMount() {
    console.log('==> componentDidMount');
    const isNoneQueryString = (Object.keys(this.props.location.query).length === 0);
    if(isNoneQueryString) return;
    this.handleUrlSubmit(this.props.location.query.url);
  }

  // ページから離れたときに呼ばれる
  componentWillUnmount() {
    console.log('==> componentWillUnmount');
  }

  render() {
    return (
      <div className={style.container}>
        <SearchForm onUrlSubmit={this.handleUrlSubmit.bind(this)} />
      </div>
    );
  }
}