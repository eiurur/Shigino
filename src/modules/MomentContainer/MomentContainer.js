import React from "react";
import ReactDOM from "react-dom";
import MomentItem from "../MomentItem/MomentItem";
import style from "./MomentContainer.scss";

export default class MomentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      count: 0,
      err: ''
    };
    this.url = '/api/tweets/moments';
  }

  componentWillReceiveProps(nextProps) {
    console.log("MomentContainer componentWillReceiveProps", nextProps);
    console.log("MomentContainer componentWillReceiveProps", this.state);
    if(nextProps.moments !== undefined) {
      this.setState({
        moments: nextProps.moments,
        count: nextProps.count,
      });
      return;
    }
  }

  render() {
    console.log("MomentContainer render ", this.state.moments);
    return (
      <div className={style.container}>
        <MomentItem
          moments={this.state.moments}
          count={this.state.count}>
        </MomentItem>
      </div>
    );
  }
}