import React from "react";
import ReactDOM from "react-dom";
import Moment from "../Moment/Moment";
import MomentItem from "../MomentItem/MomentItem";
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
  }

  rerenderMoment(moment) {
    // HACK: 一度DOMを削除して再生成する方法でしかTwitterWidgetを更新できなかった。
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.widget));

    // setStateすると二度レンダリングが走るのでこれでよい
    this.state.moment = moment;
    ReactDOM.render(<Moment moment={this.state.moment}></Moment>,  ReactDOM.findDOMNode(this.refs.widget));

    window.scroll(0, 0);
  }

  onSelectMoment(moment) {
    console.log("MomentContainer changeMoment", moment);
    this.rerenderMoment(moment);
  }

  render() {
    console.log("MomentContainer render ", this.state.moments);
    return (
      <div className={style.container}>
        <MomentItem
          moments={this.state.moments}
          count={this.state.count}
          selectedMoment={this.onSelectMoment.bind(this)}>
        </MomentItem>
      </div>
    );
  }
}