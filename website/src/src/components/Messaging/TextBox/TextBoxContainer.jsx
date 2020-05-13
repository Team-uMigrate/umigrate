import React, { Component } from "react";
import TextBoxView from "./TextBoxView";

class TextBoxContainer extends Component {
  render() {
    return (
      <TextBoxView text={this.props.text} handleChange={this.props.handleChange} handleSend={this.props.handleSend} />
    )
  }
}

export default TextBoxContainer;
