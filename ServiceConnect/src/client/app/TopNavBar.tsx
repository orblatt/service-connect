import React from "react";
import { getUsername } from "wasp/auth";
import { logout } from "wasp/client/auth";
import "./TopNavBar.css";

const TopNavbar = () => {

  return (
    <div className="top-navbar">
      static@gmail.com
      &nbsp;|&nbsp;
      <button className="plain" onClick={logout}>
        {" "}
        logout{" "}
      </button>
    </div>
  );
};

export default TopNavbar;