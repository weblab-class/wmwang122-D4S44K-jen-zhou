import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="nav-list-container">
      <div className="nav-title">Identify</div>
      <div className="nav-elements">
      <ul className="nav-item">
          <Link to="/howtoplay">
            how to play
          </Link>
        </ul>
        <ul className="nav-item">
          <Link to="/profile">
            profile
          </Link>
        </ul>

        <ul className="nav-item u-pointer" onClick={props.handleLogout}>
          logout
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
