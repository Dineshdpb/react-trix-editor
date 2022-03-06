import "./styles.css";

import Editor from "./Editor";
import React from "react";
export default class App extends React.Component {
  state = {
    content: ""
  };
  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <div>
          <Editor
            value={this.state.content}
            onChange={this.handleContentChange}
          />
        </div>
        <pre
          dangerouslySetInnerHTML={{ __html: this.state.content }}
        />
        {this.state.content}
      </div>
    );
  }
  handleContentChange = (content) => {
    this.setState({ content: content });
  };
}
