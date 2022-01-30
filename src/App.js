import React, { useState } from "react";
import "./App.css";
import UserContext from "./Components/UserContext";
import Input from "./Components/Input";
import Messages from "./Components/Messages";
import Login from "./Components/Login";

let addedMember = {};
let membersArr = [];

export default function App() {
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isActiveChat, setIsActiveChat] = useState(false);
  const [drone, setDrone] = useState(null);
  const [members, setMembers] = useState([]);

  //New User
  const onUserLogin = (username, avatar) => {
    addedMember = {
      username: username,
      avatar: avatar,
    };
    setIsActiveChat(true);

    const drone = new window.Scaledrone("dLKflhddRs7041eD", {
      data: addedMember,
      avatar: avatar,
    });
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      let copyMyId = user;
      copyMyId.id = drone.clientId;
      setDrone(drone);
      setUser(copyMyId, avatar);
    });
    //Room subscribe

    const room = drone.subscribe("observable-MyRoom");

    room.on("message", (message) => {
      const { data, id, member } = message;
      if (member === null) {
        console.log("no member");
      } else {
        let msgs = messages;
        msgs.push({ member: member, text: data, id: id });
        let newMsgs = [...msgs];
        setMessages(newMsgs);
      }
    });
    room.on("members", (m) => {
      let newMembers = m;
      membersArr = [...newMembers];
      setMembers(membersArr);
    });
  };
  //Logout

  //Sending message
  const sendMessage = (txt) => {
    drone.publish({
      room: "observable-MyRoom",
      message: txt,
    });
  };

  return (
    //Class + optional Dark/Light
    <div className={`${"Apps"} ${isDarkMode ? "App-dark" : "App"}`}>
      {/* Getting data*/}
      <UserContext.Provider value={{ user, drone, onUserLogin }}>
        {/*Class + optional Dark/Light*/}
        <div
          className={`${"App-Head"} ${
            isDarkMode ? "App-head-dark" : "App-light"
          }`}
        >
          <button
            className="buttons dark-button"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "Light Theme" : "Dark Theme"}
          </button>
          <div className="name-user">
            Welcome
            <span className="user-welcome "> {addedMember.username} </span>
          </div>
        </div>
        {isActiveChat && (
          <Messages messages={messages} currentId={user} members={members} />
        )}
        {isActiveChat && <Input onSendMessage={sendMessage} />}
        {!isActiveChat && <Login onSetUsername={onUserLogin} />}
      </UserContext.Provider>
    </div>
  );
}
