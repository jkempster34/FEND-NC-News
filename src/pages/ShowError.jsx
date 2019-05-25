import React from "react";

const ShowError = ({ location }) => {
  return (
    <div>
      {location.state ? (
        <h1>{location.state.status}</h1>
      ) : (
        <h1>page not found</h1>
      )}
      {location.state && <h1>{location.state.msg}</h1>}
    </div>
  );
};

export default ShowError;
