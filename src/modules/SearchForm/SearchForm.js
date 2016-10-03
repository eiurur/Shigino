import React from "react";
import style from "./SearchForm.scss";

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
    this.props.onWordSubmit({word: word});
    // this.setState({word: ''});
  }

  render() {
    return (
      <div className={style.container}>
        <form  onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Input search word..."
            value={this.state.word}
            onChange={this.handleTextChange}
            />
        </form>
      </div>
    );
  }
}
