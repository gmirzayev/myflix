import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './Profile.css';
import * as sessionActions from "../../store/session";
import { getProfiles } from "../../store/profiles";
import ProfileItem from "./ProfileItem";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(getProfiles());
    const sessionProfile = useSelector(state => state.session.profile);

    const generateProfileItems = profiles.map((profile) => {
        return <ProfileItem key={profile.id} />;
    })

    return (
        <div>
            {generateProfileItems}
        </div>
    )
}

export default ProfilePage;