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
        <ul>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
          {Object.keys(group).length ? (
            <>
              <li>
                <NavLink to="/group" exact={true} activeClassName="active">
                  Group
                </NavLink>
              </li>
              <li>
                <NavLink to="/recruit" exact={true} activeClassName="active">
                  Find Players
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/groups/new" exact={true} activeClassName="active">
                New Group
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/join" exact={true} activeClassName="active">
              Join a Group
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
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
