import React from "react";
import { useState, useContext } from "react";
import UserContext from "./UserContext";

import "./Login.css";

//Function Component
export default function Login() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("👧");
  const [error, setError] = useState("");

  const { onUserLogin } = useContext(UserContext);

  const handleSubmiter = (e) => {
    e.preventDefault();
    if (!username || !username.replace(/\s/g, "").length) {
      setError("Please enter your name :)");
    } else {
      setError(null);
      onUserLogin(username, avatar);
    }
  };

  return (
    <div className="loginCard form-wrapper">
      <form onSubmit={handleSubmiter}>
        <div className="text_card">
          <label htmlFor="username" className="input-text-color">
            {" "}
            Username:{" "}
          </label>
        </div>
        <input
          name="username"
          className="loginInput"
          type="text"
          placeholder='"Enter Username"'
          autoFocus={true}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <div className="form__error-message">{error}</div>
        <div className="text_card">
          <label htmlFor="avatar" className="text_card">
            Avatar:
          </label>
        </div>
        <select
          onChange={(e) => setAvatar(e.target.value)}
          className="loginInput "
        >
          <option value=" 👧"> 👧</option>
          <option value=" 🧒"> 🧒</option>
          <option value=" 🤠"> 🤠</option>
          <option value=" 🤡"> 🤡</option>
          <option value=" 👴"> 👴</option>
          <option value=" 🤵"> 🤵</option>
          <option value=" 👩‍🍳"> 👩‍🍳 </option>
          <option value=" ⚽️ "> ⚽️ </option>
          <option value=" 🎮"> 🎮</option>
        </select>
        <button className="loginBtn" type="submit" onSubmit={handleSubmiter}>
          Login
        </button>
      </form>
    </div>
  );
}
