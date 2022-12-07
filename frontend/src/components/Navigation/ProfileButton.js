import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    console.log("open");
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    console.log("close");
  setShowMenu(false);
};
  
  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = () => {
    //     console.log("close");
    //   setShowMenu(false);
    // };

    // document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={showMenu? closeMenu : openMenu}>Click me</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;