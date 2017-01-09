import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {getParams, replaceParam} from 'url-params-helper';
import style from './Moment.scss';

export default class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: ''
    };
    this.url = '/api/moment';

  }

  componentWillMount() {
    // console.log(location.href.split('/').pop());
    const moment_id = location.href.split('/').pop();
    axios({
      url: `${this.url}/${moment_id}`,
      method: 'get',
      responseType: 'json',
    })
    .then( res => {
      console.log('Moment fetch ', res.data.expanded_url);
      if(res.status !== 200) throw new Error(res.data);
      this.setState({
        moment: res.data,
      });
      loadTwitterWidget();
    })
    .catch( err => {
      this.setState({err: err});
    });
  }

  rerenderMoment() {
    ReactDOM.render(
    <a
      ref="twitterMoment"
      className="twitter-moment"
      href={`${this.state.moment.expanded_url}`}
    />,  ReactDOM.findDOMNode(this.refs.widget));

    window.scroll(0, 0);
  }

  loadTwitterWidget() {
    var twitterMoment = null;
    if (typeof twttr === 'undefined') {
      twitterMoment = ReactDOM.findDOMNode(this.refs.twitterMoment);
    } else {
      // HACK: 一度DOMを削除して再生成する方法でしかTwitterWidgetを更新できなかった。
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.twitterMoment));
      twitterMoment = ReactDOM.findDOMNode(this.refs.twitterMoment);
    }
    const twitterscript = document.createElement('script');
    twitterscript.src = '//platform.twitter.com/widgets.js';
    twitterscript.async = true;
    twitterMoment.parentNode.appendChild(twitterscript);
  }

  componentDidMount() {
    this.loadTwitterWidget();
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