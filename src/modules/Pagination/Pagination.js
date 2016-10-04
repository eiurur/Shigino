import React from "react";
import style from "./Pagination.scss";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("Pagination componentWillReceiveProps", nextProps);
    console.log("Pagination componentWillReceiveProps", nextProps.params);
    console.log("Pagination componentWillReceiveProps", this.state);
    // if(nextProps.count === undefined) return;
    this.setState({
      pageSize: Math.ceil(nextProps.count / 30),
    });
  }

  handlePrevPage() {
    if(this.state.currentPage - 1 <= 0) return;
     this.setState({
      currentPage: this.state.currentPage - 1,
    });
    console.log("Pagination page", this.state);
     this.props.onHandlePagination(this.state.currentPage - 1);
  }

  handleNextPage() {
    if(this.state.currentPage + 1 > this.pageSize) return;
     this.setState({
      currentPage: this.state.currentPage + 1,
    });
    console.log("Pagination page", this.state);
     this.props.onHandlePagination(this.state.currentPage + 1);
  }

  render() {
    return (
      <div className={style.container}>
        <span className={style.arrow} onClick={this.handlePrevPage.bind(this)}>＜</span>
        {this.state.currentPage} / {this.state.pageSize}
        <span className={style.arrow} onClick={this.handleNextPage.bind(this)}>＞</span>
      </div>
    );
  }
}