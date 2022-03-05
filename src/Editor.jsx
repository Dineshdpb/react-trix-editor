import React, { Component } from "react";
import Trix from "trix";
import "trix/dist/trix.css";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.ediotrInput = React.createRef();
  }
  componentDidMount() {
    this.ediotrInput.current.addEventListener("trix-change", (event) => {
      this.props.onChange(event.target.innerHTML); //calling custom event
    });
    this.ediotrInput.current.addEventListener(
      "trix-attachment-add",
      (event) => {
        console.log(event.attachment);
      }
    );
  }
  render() {
    return (
      <div>
        <input type="hidden" id="trix" value={this.props.value} />
        <trix-editor input="trix" ref={this.ediotrInput} />
      </div>
    );
  }
}

export default Editor;
