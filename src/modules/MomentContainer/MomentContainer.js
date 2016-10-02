import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Moment from "../Moment/Moment";
import MomentList from "../MomentList/MomentList";
import style from "./MomentContainer.scss";

export default class MomentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: {},
      moments: [],
      err: ''
    };
    this.url = '/api/tweets/moments';
  }

  clearState() {
    this.state = {
      moment: {},
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
        limit: 30
      }
    })
    .then( res => {
      console.log(res.status);
      console.log(res.data);
      if(res.status !== 200) throw new Error(res.data);
      this.setState({
        moment: res.data.moments[0],
        moments: res.data.moments
      });
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  componentDidMount() {
    this.fetchMoments();
  }

  componentDidUpdate() {
    ReactDom.findDOMNode(this).scrollIntoView();
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("MomentContainer componentWillReceiveProps");
  //   console.log(this.props, nextProps);
  //   this.setState({
  //     moment: nextProps.moment,
  //   });
  // }

  changeMoment(moment) {
    console.log("MomentContainer changeMoment", moment);

    // HACK: 一度DOMを削除して再生成する方法でしかTwitterWidgetを更新できなかった。
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.widget));

    // setStateすると二度レンダリングが走るのでこれでよい
    this.state.moment = moment;
    ReactDOM.render(<Moment moment={this.state.moment}></Moment>,  ReactDOM.findDOMNode(this.refs.widget));

    this.scrollToTop();
  }


  render() {
    console.log("MomentContainer moments ", this.state.moments);
    return (
      <div className={style.container}>
        <MomentList moments={this.state.moments} selectedMoment={this.changeMoment.bind(this)}></MomentList>
        <Moment ref="widget" moment={this.state.moment}></Moment>
      </div>
    );
  }
}