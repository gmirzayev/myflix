import React, {useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProfiles, fetchProfiles } from '../../store/profiles';
import * as sessionActions from '../../store/session';
import './Navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [dropdown, setDropdown] = useState(false);
  const currentProfile = useSelector((state) => state.session.profile);
  const profiles = useSelector(getProfiles);

  useEffect(() => {
    dispatch(fetchProfiles());
}, [dispatch])

  const handleProfileSwitch = (e) => {
    let profile = profiles.find((profile) => profile.id === e.target.value)
    dispatch(sessionActions.setCurrentProfile(profile));
  }
 
  const profileSwitchButtons = profiles.filter((profile) => {
    if(profile.name !== currentProfile.name) {
      return true;
    } else {
      return false;
    }}).map((profile) => {
      return (
      <li className="profile-switch" key={profile.id} value={profile.id} onClick={handleProfileSwitch}>
        <img className="profile-picture-icon" src={require('../../assets/poro.png')} alt="profile"></img>
        {profile.name}
      </li>
      )
  })

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  

  return (
    <div className="main-header">
      <Link to="/">Logo</Link>
      <ul className="main-navigation">
        <li className="navlink-tab">
          <NavLink to="/browse" className="main-navigation-navlink">Home</NavLink>
        </li>
        <li className="navlink-tab">
          <NavLink to="/browse" className="main-navigation-navlink">TV Shows</NavLink>
        </li>
        <li className="navlink-tab">
          <NavLink to="/browse" className="main-navigation-navlink">Movies</NavLink>
        </li>
        <li className="navlink-tab">
          <NavLink to="/browse" className="main-navigation-navlink">My List</NavLink>
        </li> 
      </ul>
      <div className="second-navigation">
        <div className="dropdown-account" onMouseEnter={(e) => setDropdown(true)} onMouseLeave={(e) => setDropdown(false)}>
          <div className="dropdown-button">
            <img className="profile-picture-icon" src={require('../../assets/poro.png')} alt="profile"></img>
            <span className="profile-arrow"></span>
          </div>
          <div className={dropdown ? "second-navigation-dropdown active" : "second-navigation-dropdown"}>
            <ul className="select-profile-list">
              {profileSwitchButtons}
            </ul>
            <ul className="logout-container">
              <li className="logout">
                <button className="logout-button" onClick={logout}>Sign out of myflix</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;