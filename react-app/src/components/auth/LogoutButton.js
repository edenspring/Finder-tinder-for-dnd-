import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout());
  };

  return <a onClick={onLogout} href='/'>Logout</a>;
};

export default LogoutButton;
