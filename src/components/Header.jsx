import React, { Component } from "react";
import { Link } from "@reach/router";
import ncNewsLogo from "../images/nc-news-logo.png";
import LoginPopup from "./Header.LoginPopup";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">
          <img src={ncNewsLogo} alt="NC News logo" id="header-logo" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/articles">All</Link>
        <LoginPopup loginUser={this.props.loginUser} />
      </div>
    );
  }
}

export default Header;
