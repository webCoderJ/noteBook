import React, { PropTypes, createContext, useContext } from "react";

let ColorContext = createContext({
  color: "#ff0"
});

/**
 * README!!
 *
 * 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
 */

class Button extends React.Component {
  static contextType = {
    color: PropTypes.string
  };

  render() {
    let { color } = this.context;

    return (
      <ColorContext.Consumer>
        {value => <button style={{ color: value }}>Click Me</button>}
      </ColorContext.Consumer>
    );
  }
}

class Message extends React.Component {
  static childContextType = {
    color: PropTypes.string
  };
  getChildContext() {
    return {
      color: "#ff0"
    };
  }
  render() {
    <ColorContext.Provider>
      this is an button
      <Button></Button>
    </ColorContext.Provider>;
  }
}
