import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  const user = useSelector((state) => ({ ...state.session.user }));
  const group = useSelector((state) => ({ ...state.group }));

  let groupPath = user.group ? "/group" : "/groups/new";

  useEffect(() => {}, []);

  if (user.group) groupPath = "/group";
  else groupPath = "/groups/new";

  return (
    <nav>
      {!!Object.values(user).length ? (
        <>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          {Object.keys(group).length ? (
            <>
              <NavLink to="/group" exact={true} activeClassName="active">
                Group
              </NavLink>
              <NavLink to="/recruit" exact={true} activeClassName="active">
                Find Players
              </NavLink>
            </>
          ) : (
            <NavLink to="/groups/new" exact={true} activeClassName="active">
              New Group
            </NavLink>
          )}

          <NavLink to="/join" exact={true} activeClassName="active">
            Join a Group
          </NavLink>
          <NavLink to="/chats" exact={true} activeClassName="active">
            Chat with Matches
          </NavLink>
          <LogoutButton />
        </>
      ) : (
        <>
          <NavLink to="/about" exact={true} activeClassName="active">
            About
          </NavLink>

          <NavLink to="/" exact={true} activeClassName="active">
            Back to Main
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
