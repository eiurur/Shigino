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
      count: 0,
      err: ''
    };
    this.url = '/api/tweets/moments';
  }

  clearState() {
    this.state = {
      moment: {},
      moments: [],
      count: 0,
      err: ''
    };
  }


  fetchMoments(params = {}) {

    axios({
      url: this.url,
      method: 'get',
      responseType: 'json',
      params: Object.assign(params, {
        skip: (params.currentPage - 1) * 30 || 0,
        limit: 30
      })
    })
    .then( res => {
      console.log(res.status);
      console.log(res.data);
      if(res.status !== 200) throw new Error(res.data);
      this.setState({
        moment: res.data.moments[0],
        moments: res.data.moments,
        count: res.data.count,
      });
      this.changeMoment(res.data.moments[0]);
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  // componentDidMount() {
  //   console.log("MomentContainer compoentDidMount this.props", this.props);
  //     // this.setState({
  //     //   moment: this.props.moments[0],
  //     //   moments: this.props.moments
  //     // });
  //   if(this.props.params == undefined) return;

  //   this.fetchMoments({username: this.props.params.username});
  // }

  scrollToTop() {
    window.scroll(0, 0);
  }

  componentWillMount() {
    console.log("MomentContainer componentWillMount", this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("MomentContainer componentDidUpdate", this.state);
    console.log("MomentContainer componentDidUpdate", this.prevProps);
    console.log("MomentContainer componentDidUpdate", this.prevState);
  }


  componentWillReceiveProps(nextProps) {
    console.log("MomentContainer componentWillReceiveProps", nextProps);
    console.log("MomentContainer componentWillReceiveProps", this.state);
    if(nextProps.moments !== undefined) {
      this.setState({
        moment: nextProps.moments[0],
        moments: nextProps.moments,
        count: nextProps.count,
      });
      this.rerenderMoment(nextProps.moments[0]);
      return;
    }
    console.log("nextProps.momnets === undefined", nextProps.momnets === undefined);
    this.fetchMoments({username: nextProps.params.username});
    this.scrollToTop();
  }

  rerenderMoment(moment) {
    // HACK: 一度DOMを削除して再生成する方法でしかTwitterWidgetを更新できなかった。
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.widget));

    // setStateすると二度レンダリングが走るのでこれでよい
    this.state.moment = moment;
    ReactDOM.render(<Moment moment={this.state.moment}></Moment>,  ReactDOM.findDOMNode(this.refs.widget));
  }

  onSelectMoment(moment) {
    console.log("MomentContainer changeMoment", moment);
    this.rerenderMoment(moment);
    this.scrollToTop();
  }

  onSelectUsername(username) {
    console.log("MomentContainer changeUsername", username);

    this.fetchMoments({username: username});

    this.scrollToTop();
  }

  onHandlePagination(currentPage) {
    console.log("MomentContainer handlePagination currentPage", currentPage);
    this.fetchMoments({currentPage: currentPage});
    this.scrollToTop();

  }


  render() {
    console.log("MomentContainer render ", this.state.moments);
    return (
      <div className={style.container}>
        <MomentList
          moments={this.state.moments}
          count={this.state.count}
          selectedMoment={this.onSelectMoment.bind(this)}
          selectedUsername={this.onSelectUsername.bind(this)}
          handlePagination={this.onHandlePagination.bind(this)}>
        </MomentList>
        <Moment ref="widget" moment={this.state.moment}></Moment>
      </div>
    );
  }
}