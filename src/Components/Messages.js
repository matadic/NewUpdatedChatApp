import { Component } from "react";
import React from "react";
import Online from "./Online";
import "./Messages.css";

//Class Component
export default class Messages extends Component {
  render() {
    const { messages } = this.props;
    const { members } = this.props;
    //For online members -  TODO

    return (
      <div className="messages-list">
        <Online members={members}></Online>
        <div className="pokusaj">
          {messages.map((m) => this.renderMessage(m))}
        </div>
      </div>
    );
  }

  renderMessage(message) {
    const { member, text, id } = message;
    const { currentId } = this.props;
    const messageFromMe = member.id === currentId.id;

    const className = messageFromMe
      ? "messages-message currentMember"
      : "messages-message";

    return (
      <li className={className} key={id}>
        <span className="avatar">
          <div className="message_username my-username">
            {member.clientData.username}
          </div>
          <div className="c-message__avatar">{member.clientData.avatar}</div>
        </span>
        <div className="message-content">
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}
