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
  // debugger

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch])

  const handleProfileSwitch = (e) => {
    let profile = profiles.find((profile) => profile.id === e.target.value)
    dispatch(sessionActions.setCurrentProfile(profile));
    sessionActions.storeCurrentProfile(profile);
  }

  const removeProfile = () => {
    dispatch(sessionActions.removeCurrentProfile());
  }

  const profileSwitchButtons = profiles.filter((profile) => {
    if(profile.name !== currentProfile.name) {
      return true;
    } else {
      return false;
    }}).map((profile) => {
      return (
      <li className="profile-switch" key={profile.id} value={profile.id} onClick={handleProfileSwitch}>
        <img className="profile-picture-icon" src={`${profile.picture}`} alt="profile"></img>
        <span>{profile.name}</span>
      </li>
      )
  })

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  

  return (
    <div className="main-header">
      <Link to="/">
        <svg className="myflix-logo-browse" width="519" height="146" viewBox="0 0 519 146" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_18_79)">
              <path d="M64.31 0.240156H62.19L61.85 2.34016C57.48 29.0702 53.17 55.8702 49 82.1902C44.53 55.9602 40.03 29.1902 35.58 2.41016L35.23 0.310156H33.11C22.91 0.340156 12.71 0.380156 2.51 0.410156H0.02L0 145.46L2.96 144.91C9.29 143.74 15.68 142.59 21.98 141.52L24.06 141.16L24.15 70.3102C27.9 92.6901 31.67 114.95 35.41 136.78L35.83 139.22L38.27 138.83C45.11 137.74 52.06 136.69 58.94 135.69L60.77 135.43L61.06 133.61C64.43 112.1 67.91 90.2202 71.44 68.2602L71.24 133.98L74.08 133.6C80.95 132.69 87.93 131.81 94.81 131L97.01 130.74L97.42 0.160156H94.91C84.71 0.190156 74.51 0.210156 64.31 0.230156V0.240156Z" fill="#EC0013"/>
              <path d="M172.92 1.80953C167.77 18.4695 162.98 34.0695 158.34 49.2795C153.48 33.2495 148.7 17.3395 144.1 1.87953L143.57 0.0895313L115.24 0.139531L116.34 3.42953C125.13 29.7595 134.1 56.0495 143.75 83.7895L143.61 126.12L146.32 125.9C153.61 125.31 161.01 124.77 168.33 124.3L170.66 124.15L170.78 82.7095C179.17 58.5195 188.3 32.5595 198.67 3.36953L199.86 0.0195312L173.47 0.0395312L172.93 1.79953L172.92 1.80953Z" fill="#EC0013"/>
              <path d="M278.32 0.000234375C258.92 0.000234375 239.52 0.000234375 220.11 0.000234375H217.61L217.44 121.96L220.01 121.89C227.32 121.69 234.74 121.54 242.06 121.45L244.53 121.42L244.56 73.3602C253.18 73.3102 261.9 73.3002 270.52 73.3402H273.03V51.7202H270.54C261.94 51.6802 253.22 51.6802 244.58 51.7202L244.6 21.6302C255.81 21.6102 267.14 21.6202 278.32 21.6302H280.83L280.81 -0.00976562H278.31L278.32 0.000234375Z" fill="#EC0013"/>
              <path d="M362.6 103C351.35 102.29 339.94 101.68 328.64 101.2L328.42 0.0297656L301.42 0.00976562L301.62 121.99L304.04 122.07C323.41 122.69 343.02 123.73 362.33 125.15L365.02 125.35L364.95 103.16L362.62 103.01L362.6 103Z" fill="#EC0013"/>
              <path d="M384.21 0.0998437L384.64 126.97L386.9 127.18C394.22 127.85 401.61 128.58 408.87 129.36L411.65 129.66L411.21 0.139844L384.21 0.0898438V0.0998437Z" fill="#EC0013"/>
              <path d="M517.12 141.51C509.35 117.24 501.19 92.6802 492.86 68.4902C500.47 47.2202 508.08 25.4302 515.48 3.7102L516.6 0.420195L490.92 0.340195L490.35 2.0502C485.6 16.2102 480.75 30.4902 475.88 44.5702C471.2 30.4502 466.37 16.1502 461.49 1.9502L460.91 0.270195L432.72 0.200195L433.99 3.5802C441.85 24.5602 449.53 45.5902 456.84 66.1102C449.08 86.9102 441 108.06 432.81 129L431.64 131.99L434.82 132.39C441.62 133.25 448.53 134.17 455.33 135.13L457.34 135.41L458.03 133.51C463.28 119.1 468.51 104.51 473.61 90.0502C478.95 106.33 484.23 122.75 489.32 138.97L489.78 140.43L491.29 140.68C498.94 141.96 506.67 143.33 514.28 144.73L518.39 145.49L517.11 141.51H517.12Z" fill="#EC0013"/>
          </g>
          <defs>
              <clipPath id="clip0_18_79">
                  <rect width="518.4" height="145.49" fill="white"/>
              </clipPath>
          </defs>
        </svg>
      </Link>
      <ul className="main-navigation">
        <li className="navlink-tab">
          <NavLink to="/browse/all" activeStyle={{ color:'white' }} className="main-navigation-navlink">Home</NavLink>
        </li>
        {/* <li className="navlink-tab">
          <NavLink to="/browse/tv" activeStyle={{ color:'white' }} className="main-navigation-navlink">TV Shows</NavLink>
        </li>
        <li className="navlink-tab">
          <NavLink to="/browse/movies" activeStyle={{ color:'white' }} className="main-navigation-navlink">Movies</NavLink>
        </li> */}
        <li className="navlink-tab">
          <NavLink to="/mylist" activeStyle={{ color:'white' }} className="main-navigation-navlink">My List</NavLink>
        </li> 
      </ul>
      <div className="second-navigation">
        <div className="dropdown-account" onMouseEnter={(e) => setDropdown(true)} onMouseLeave={(e) => setDropdown(false)}>
          <div className="dropdown-button">
            <img className="profile-picture-icon" src={`${currentProfile.picture}`} alt="profile"></img>
            <span className="profile-arrow"></span>
          </div>
          <div className={dropdown ? "second-navigation-dropdown active" : "second-navigation-dropdown"}>
            <ul className="select-profile-list">
              {profileSwitchButtons}
            </ul>
            <ul className="logout-container">
              <li className="profiles">
                <button className="profiles-button" onClick={removeProfile}>Manage Profile</button>
              </li>
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