import React from "react";
import webpack from "@/assets/webpack.png";
import "./index.scss";
import { a } from "@/common/test-tree-shaking";

class PageHome extends React.Component {
  state = {
    Dynamic: null
  };

  loadComponent() {
    import("@/common/dynamic-import").then(resolve => {
      console.log("TCL: PageHome -> loadComponent -> resolve", resolve);
      this.setState({
        Dynamic: resolve.default
      });
    });
  }

  render() {
    let resulta = a();
    const { Dynamic } = this.state;
    return (
      <div className="home">
        <div className="title">
          <img src={webpack} alt="123" />
          <p>{resulta}</p>
          <p>Document.getElementById('webpack4 ^_^')</p>
          <p onClick={this.loadComponent.bind(this)}>
            Click Me To Dynamic Import A Component
            <br />
            {Dynamic ? <Dynamic /> : null}
          </p>
        </div>
      </div>
    );
  }
}

export default PageHome;
