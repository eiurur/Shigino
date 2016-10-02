import React from "react";
import axios from 'axios';
import Moment from "../Moment/Moment";
import style from "./MomentList.scss";

export default class MomentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: this.props.moments,
    };
  }

  // ページを読み込んだときに呼ばれる
  componentDidMount() {
    console.log("MomentList componentDidMount");
    console.log(this.props, this.state);

  }

  componentWillReceiveProps(nextProps) {
    console.log("MomentList componentWillReceiveProps");
    console.log(this.props.moments, nextProps.moments);
    this.state = {
      moments: nextProps.moments,
    };
  }

  handleChange(moment) {
    console.log("MomentList handleChange ", moment);
    this.props.selectedMoment(moment);
  }


  render() {
    let momentNodes;
    if(this.state.moments.length === 0) {
      momentNodes = <div><h2>空</h2></div>;
    } else {
      momentNodes = this.state.moments.map((moment, i) => {
        return (
          <div className={style.media} >
            <img className={style.figure} src={moment.thumbnail} onClick={this.handleChange.bind(this, moment)}/>
            <div className={style.body}>
              <h3 className={style.title}>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
          </div>
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