import React, { useRef, useEffect } from "react";
import "./TextBoxStyles.css";

const TextBoxView = (props) => {
  const divRef = useRef(null);

  // this function will smoothly bring a user down to the
  // newest message in a chat. its intent is for when a new
  // message is sent from another, but with the current scrolling
  // upward to see messages, it will kick the user to the bottom
  // again. TBFIXED

  // useEffect(() => {
  //   divRef.current.scrollIntoView({behavior: 'smooth'});
  // });

  return (
    <div ref={divRef}>
      <input
        id="chat-message-input"
        type="text"
        value={props.text}
        onChange={props.handleChange}
        autoFocus="true"
        onKeyUp={(e) => (e.keyCode === 13 ? props.handleSend() : null)}
      />
      <input
        id="chat-message-submit"
        type="button"
        value="Send"
        onClick={props.handleSend}
      />
    </div>
  );
};

export default TextBoxView;
