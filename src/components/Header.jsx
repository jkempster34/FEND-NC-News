import React, { Component } from "react";
import { Link } from "@reach/router";
import ncNewsLogo from "../images/nc-news-logo.png";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={ncNewsLogo} alt="NC News logo" id="header-logo" />
        <p>Header</p>
      </div>
    );
  }
}

export default Header;
