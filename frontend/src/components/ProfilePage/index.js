import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './Profile.css';
import { getProfiles, fetchProfiles } from "../../store/profiles";
import ProfileItem from "./ProfileItem";

const ProfilePage = ({editable}) => {
    const dispatch = useDispatch();
    const profiles = useSelector(getProfiles);
    const sessionProfile = useSelector(state => state.session.profile);

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch])

    if (sessionProfile) {
        return <Redirect to="/browse" />;
    }

    const generateProfileItems = profiles.map((profile) => {
        return <ProfileItem key={profile.id} profile={profile} editable={editable}/>;
    })

    return (
        <div className="profile-page">
            <div className="profile-centered-container">
                <div className="profile-container">
                    <h1>Who's watching?</h1>
                    <ul>
                        {generateProfileItems}
                    </ul>
                </div>
            </div>   
        </div>
    )
}

export default ProfilePage;