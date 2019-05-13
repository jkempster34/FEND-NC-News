import React from "react";

const CurrentUserDisplay = ({ loggedInUser }) => {
  return (
    <div>
      <p>Username: {loggedInUser.username}</p>
      <p>Name: {loggedInUser.name}</p>
      <img src={loggedInUser.avatar_url} alt="User avatar" id="user-avatar" />
    </div>
  );
};

export default CurrentUserDisplay;
