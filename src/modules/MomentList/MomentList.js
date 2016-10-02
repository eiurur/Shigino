import React from "react";
import axios from 'axios';
import Moment from "../Moment/Moment";
import style from "./MomentList.scss";

export default class MomentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      err: ''
    };
    this.url = '/api/tweets/moments';
  }

  clearState() {
    this.state = {
      moments: [],
      err: ''
    };
  }


  fetchMoments() {
    this.clearState();

    axios({
      url: this.url,
      method: 'get',
      responseType: 'json',
      params: {
        limit: 10
      }
    })
    .then( res => {
      console.log(res.status);
      console.log(res.data);
      if(res.status !== 200) throw new Error(res.data);
      this.setState({moments: res.data.moments});
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  // ページを読み込んだときに呼ばれる
  componentDidMount() {
    console.log('==> componentDidMount');
    // const isNoneQueryString = (Object.keys(this.props.location.query).length === 0);
    // if(isNoneQueryString) return;
    this.fetchMoments();
  }


  render() {
    console.log(this.state.moments);
    let momentNodes;
    if(this.state.err) {
      momentNodes = <div><h2>{this.state.err.message}</h2></div>;
    } else {
      momentNodes = this.state.moments.map((moment) => {
        return (
          <Moment moment={moment}></Moment>
        );
      });
    }

    return (
      <div className={style.container}>
        {momentNodes}
      </div>
    );
  }
}