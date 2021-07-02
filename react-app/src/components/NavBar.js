import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => ({...state.session.user}))
  const group = useSelector(state => ({...state.group}))

  let groupPath = user.group ? '/group' : '/groups/new'

  useEffect(()=>{

  },[])

  if (user.group) groupPath = '/group'
  else groupPath = '/groups/new'

  console.log(Object.keys(group), 'weeeooooweeeeooo')

  return (
    <nav>
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
        <li>
          {Object.keys(group).length ? (
          <NavLink to='/group' exact={true} activeClassName="active">
            Group
          </NavLink>

          ):
          (
            <NavLink to='/groups/new' exact={true} activeClassName="active">
              New Group
            </NavLink>
          )}
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
