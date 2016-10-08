import React from 'react';
import {browserHistory} from 'react-router';
import {getParam, replaceParam} from 'url-params-helper';
import style from './SearchForm.scss';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({word: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var word = this.state.word.trim();
    browserHistory.push(replaceParam('word', word, replaceParam('currentPage', 1, '/main')));
  }

  render() {
    return (
      <div className={style.container}>
        <form  onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Input search word...'
            value={this.state.word}
            onChange={this.handleTextChange}
            />
        </form>
      </div>
    );
  }
}
