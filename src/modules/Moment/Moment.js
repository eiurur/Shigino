import React from 'react';
import ReactDOM from 'react-dom';
import style from './Moment.scss';

export default class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      moment: this.props.moment,
    };
  }

  loadTwitterWidget() {
    if (typeof twttr === 'undefined') {
      const twitterMoment = ReactDOM.findDOMNode(this.refs.twitterMoment);
      const twitterscript = document.createElement('script');
      twitterscript.src = '//platform.twitter.com/widgets.js';
      twitterscript.async = true;
      twitterMoment.parentNode.appendChild(twitterscript);
    } else {
      twttr.widgets.load();
    }
  }

  componentDidMount() {
    if (this.state.initialized) {
      return;
    }
    this.loadTwitterWidget();
    this.initialized();
  }

  initialized() {
    this.setState({ initialized: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      moment: nextProps.moment,
    });
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.moment}>
          <a
            ref="twitterMoment"
            className="twitter-moment"
            href={`${this.state.moment.expanded_url}`}
          />
        </div>
      </div>
    );
  }
}