import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './EditProfile.css';
import { getProfile, getProfiles, fetchProfiles } from "../../store/profiles";

const EditProfilePage = () => {
    const {profileId} = useParams();
    const profile = useSelector(getProfile(profileId));
    const [profileName, setProfileName] = useState(profile.name);
    

    return (
        <div>
            <form>
                <input type="text" value={profileName} onChange={(e)=>setProfileName(e.target.value)}></input>
                {/* <button type="submit" onClick={handleSubmit}>Save</button>
                <button type="submit" onClick={handleCancel}>Cancel</button>
                <button type="submit" onClick={handleDelete}>Delete Profile</button> */}
            </form>
        </div>
    )

    // // const dispatch = useDispatch();
    // const profiles = useSelector(getProfiles);
    // const currentUser = useSelector(state => state.session.user)

    // // useEffect(() => {
    // //     dispatch(fetchProfiles(currentUser.id));
    // // }, [dispatch])

    // const generateProfileItems = profiles.map((profile) => {
    //     return <ProfileItem key={profile.id} profile={profile} editable={true}/>;
    // })

    // return (
    //     <div className="profile-page">
    //         <div className="profile-centered-container">
    //             <div className="profile-container">
    //                 <h1>Who's watching?</h1>
    //                 <ul>
    //                     {generateProfileItems}
    //                 </ul>
    //             </div>
    //         </div>   
    //     </div>
    // )
}

export default EditProfilePage;