import React from "react";
import { useState, useContext } from "react";
import UserContext from "./UserContext";

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
    <div className="loginCard">
      <form onSubmit={handleSubmiter}>
        <div className="text_card">
          <label htmlFor="username"> Username: </label>
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
          <label htmlFor="avatar">Avatar: </label>
        </div>
        <select
          onChange={(e) => setAvatar(e.target.value)}
          className="loginInput text_card"
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
