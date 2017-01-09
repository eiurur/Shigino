import React from 'react';
import { Link } from 'react-router';
import Moment from '../Moment/Moment';
import Pagination from '../Pagination/Pagination';
import style from './MomentItem.scss';

export default class MomentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: this.props.moments,
      count: this.props.count,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('MomentItem componentWillReceiveProps');
    console.log(this.props.moments, nextProps.moments);
    this.state = {
      moments: nextProps.moments,
      count: nextProps.count,
    };
  }

  handleChange(moment) {
    console.log('MomentItem handleChange ', moment);
    this.props.selectedMoment(moment);
  }

  render() {
    let momentNodes;
    if(this.state.moments.length === 0) {
      momentNodes = <div><h2>空</h2></div>;
    } else {
      momentNodes = this.state.moments.map((moment, i) => {
        return (
          <div className={style.item}>
            <div className={style.overlay}></div>
            <section className={style.attribution}>
              <div className={style.title}>
                <div>
                  <Link to={`/moment/${moment.moment_id}`}>{moment.title}</Link>
                </div>
              </div>
              <div className={style.description}>
                <div>{moment.description}</div>
              </div>
              <div className={style.postedBy}>
                <Link to={`/user/@${moment.createdBy.username}`}>
                  <img src={moment.createdBy.avater} className={style.avater}/>
                  <div className={style.username}>@{moment.createdBy.username}</div>
                </Link>
              </div>
            </section>
            <img src={moment.thumbnail} className={style.catch}/>
          </div>
        );
      });
    }

    return (
      <div className={style.container}>
        <Pagination count={this.state.count}></Pagination>
        <div className={style.nodes}>
          {momentNodes}
        </div>
        <Pagination count={this.state.count}></Pagination>
      </div>
    );
  }
}