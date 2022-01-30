import React from "react";
import "./Online.css";
const Online = ({ members }) => {
  return (
    <div className="members-area">
      <h6 className="members-num ">
        {members.length === 1
          ? members.length + " user online:"
          : members.length + " users online:"}
      </h6>
      <div className="online-members">
        {members.map((member) => {
          return (
            <li key={member.id} className="online-member">
              <span className="circle"> 🟢 </span>
              {member.clientData.username}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Online;
