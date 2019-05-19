import React from "react";

const CurrentUserDisplay = ({ loggedInUser }) => {
  return (
    <span id="current-user-display">
      <span>{loggedInUser.username}</span>
      <span className="user-display-dividing-lines"> | </span>
      <img id="user-avatar" src={loggedInUser.avatar_url} alt="User avatar" />
      <span className="user-display-dividing-lines"> | </span>
    </span>
  );
};

export default CurrentUserDisplay;
