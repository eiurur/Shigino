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
    // this.url = '/api/tweets/moments';
    this.url = '/api/moments';
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.moments !== undefined) {
      this.setState({
        moments: nextProps.moments,
        count: nextProps.count,
      });
      return;
    }
  }

  render() {
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