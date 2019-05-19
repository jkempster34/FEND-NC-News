import React from "react";

const CurrentUserDisplay = ({ loggedInUser }) => {
  return (
    <div>
      <span>{loggedInUser.username}</span>
      <img src={loggedInUser.avatar_url} alt="User avatar" id="user-avatar" />
    </div>
  );
};

export default CurrentUserDisplay;
