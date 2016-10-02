import React from "react";
import ImageZoom from 'react-medium-image-zoom'
import style from './Image.scss'
import LazyLoad  from 'react-lazyload';

export default class Image extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.image}>
          <LazyLoad height={200} offset={100} >
            <ImageZoom
              image={{
                src: this.props.url,
                className: style.thumnail
              }}
              zoomImage={{
                src: this.props.url,
                className: style.zoom
              }}
            />

          </LazyLoad>
        </div>
      </div>
    );
  }
}