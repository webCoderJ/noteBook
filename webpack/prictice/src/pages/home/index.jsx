import React from "react";
import webpack from "@/assets/webpack.png";
import "./index.scss";

class PageHome extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="title">
          <img src={webpack} alt="123" />
          <p>Document.getElementById('webpack4 ^_^')</p>
        </div>
      </div>
    );
  }
}

export default PageHome;
