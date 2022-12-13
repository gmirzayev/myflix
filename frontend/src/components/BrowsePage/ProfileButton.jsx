import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
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

  const switchProfile = (e) => {
    e.preventDefault();
    dispatch(sessionActions.removeCurrentProfile());
  }

  return (
    <>
      <button onClick={showMenu? closeMenu : openMenu}>Click me</button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li></li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          <li>
            <button onClick={switchProfile}>Switch Profile</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;