import React from "react";
import ReactDOM from 'react-dom';
import style from './Moment.scss'

export default class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ initialized: false });
  }

  componentDidMount() {

    const twitterMoment = ReactDOM.findDOMNode(this.refs.twitterMoment);
    const twitterscript = document.createElement('script');
    twitterscript.src = '//platform.twitter.com/widgets.js';
    twitterscript.async = true;
    twitterMoment.parentNode.appendChild(twitterscript);

  }

  render() {
    console.log('Moment', this.props);
    return (
      <div className={style.container}>
        <div className={style.moment}>
          <a
            ref="twitterMoment"
            className="twitter-moment"
            href={`${this.props.moment.expanded_url}`}
          />
        </div>
      </div>
    );
  }
}