import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './Profile.css';
import { getProfiles, fetchProfiles } from "../../store/profiles";
import ProfileItem from "./ProfileItem";
import EditProfilePage from "../EditProfilePage";

const ProfilePage = ({editable}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const profiles = useSelector(getProfiles);
    const currentUser = useSelector(state => state.session.user)
    const sessionProfile = useSelector(state => state.session.profile);
    const [showProfile, setShowProfile] = useState(false);
    const [editProfile, setEditProfile] = useState({});

    useEffect(() => {
        dispatch(fetchProfiles(currentUser.id));
    }, [dispatch])

    if (sessionProfile && !editable) {
        return <Redirect to="/browse" />;
    }

    const generateProfileItems = profiles.map((profile) => {
        return <ProfileItem key={profile.id} profile={profile} setEditProfile={setEditProfile} 
        setShowProfile={setShowProfile} editable={editable}/>;
    })

    const handleFinishClick = () => {
        history.push('/browse');
    }

    const handleManageClick = () => {
        history.push('/profiles/manage');
    }

    return (
        <>
            {showProfile && editProfile ? <EditProfilePage editProfile={editProfile} /> : <div className="profile-page">
                <div className="profile-centered-container">
                    <div className="profile-container">
                        <h1>{editable ? "Manage Profiles:":"Who's watching?"}</h1>
                        <ul>
                            {generateProfileItems}
                        </ul>
                        {editable ? <button className="edit-finish-button" onClick={handleFinishClick}>Done</button> : 
                                    <button className="manage-profile-button" onClick={handleManageClick}>Manage Profiles</button>}
                    </div>
                </div>   
            </div>}
        </>
    )
}

export default ProfilePage;