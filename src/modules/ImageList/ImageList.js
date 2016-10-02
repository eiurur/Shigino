import React from "react";
import Image from "../Image/Image";
import style from "./ImageList.scss";

export default class ImageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageNodes;
    if(this.props.err) {
      imageNodes = <div><h2>{this.props.err.message}</h2></div>;
    } else {
      imageNodes = this.props.images.map((image) => {
        return (
          <Image url={image}></Image>
        );
      });
    }

    return (
      <div className={style.container}>
        {imageNodes}
      </div>
    );
  }
}