import React from 'react';
import { Link } from 'react-router';
import Moment from '../Moment/Moment';
import Pagination from '../Pagination/Pagination';
import style from './MomentList.scss';

export default class MomentList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let momentNodes;
    if(this.props.moments.length === 0) {
      momentNodes = <div><h2>空</h2></div>;
    } else {
      momentNodes = this.props.moments.map((moment, i) => {
        return (
          <div className={style.media} >
            <img className={style.figure} src={moment.thumbnail} onClick={this.handleChange.bind(this, moment)}/>
            <div className={style.body}>
              <h3 className={style.title}>
                {moment.title}
                <Link to={`/user/@${moment.username}`} className={style.username}>@{moment.username}</Link>
              </h3>
              <p>{moment.description}</p>
            </div>
          </div>
        );
      });
    }

    return (
      <div className={style.container}>
        <Pagination count={this.props.count}></Pagination>
        <div className={style.nodes}>
          {momentNodes}
        </div>
        <Pagination count={this.props.count}></Pagination>
      </div>
    );
  }
}