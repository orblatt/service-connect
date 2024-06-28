import React from "react";
import { AuthUser } from 'wasp/auth'
import { getUsername } from "wasp/auth";
import { logout } from "wasp/client/auth";
import "./TopNavBar.css";

const TopNavbar = ({ user }: { user: AuthUser }) => {
  const username = getUsername(user);

  return (
    <div className="top-navbar">
      {username}
      &nbsp;|&nbsp;
      <button className="plain" onClick={logout}>
        {" "}
        logout{" "}
      </button>
    </div>
  );
};

export default TopNavbar;