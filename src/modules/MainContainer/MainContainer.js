import React from "react";
import axios from "axios";
import SearchForm from "../SearchForm/SearchForm";
import MomentContainer from "../MomentContainer/MomentContainer";
import style from "./MainContainer.scss";

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      moments: [],
      err: null
    };
    this.url = '/api/tweets/moments';
  }

  componentDidMount() {
    this.handleSubmit();
  }

  componentWillReceiveProps(nextProps) {
    console.log("MainContainer componentWillReceiveProps", nextProps);
    console.log("MainContainer componentWillReceiveProps", nextProps.params);
    if(nextProps.params) {
      if(nextProps.params.username) this.handleSubmit({username: nextProps.params.username});
      else this.handleSubmit();
    }
  }

  handleSubmit(params = {}) {
    console.log("MainContainer handleSubmit", params);

    axios({
      url: this.url,
      method: 'get',
      responseType: 'json',
      params: {
        username: params.username,
        word: params.word,
        limit: 30,
        skip: 0
      }
    })
    .then( res => {
      console.log('MainContainer fetch ', res.data);
      if(res.status !== 200) throw new Error(res.data);
      this.setState({moments: res.data.moments});
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  render() {
    console.log("MainContainer render ");
    return (
      <div className={style.container}>
        <SearchForm onWordSubmit={this.handleSubmit.bind(this)}></SearchForm>
        <MomentContainer moments={this.state.moments}></MomentContainer>
      </div>
    );
  }
}