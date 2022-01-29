import React from "react";
import { useState } from "react";

import "./Input.css";

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const changeText = (e) => {
    const chatText = e.target.value;
    setText(chatText.trimStart());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="formChat">
        <input
          className="inputChat"
          onChange={changeText}
          value={text}
          type="text"
          placeholder="Enter message here!"
          autoFocus={true}
        ></input>
        <button type="submit" className="buttons" onSubmit={handleSubmit}>
          Send!
        </button>
      </form>
    </div>
  );
}
