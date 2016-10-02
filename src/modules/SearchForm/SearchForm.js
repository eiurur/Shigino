import React from "react";
import style from "./SearchForm.scss";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({url: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var url = this.state.url.trim();
    if (!url) {
      return;
    }

    this.props.onUrlSubmit(url);
    this.setState({url: ""});
  }

  render() {
    return (
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          pattern="https?://.+"
          placeholder="Input url..."
          value={this.state.url}
          onChange={this.handleTextChange}
          />
      </form>
    );
  }
}
