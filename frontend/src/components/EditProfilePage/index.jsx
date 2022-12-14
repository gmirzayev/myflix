import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './EditProfile.css';
import { getProfile, fetchProfile  } from "../../store/profiles";

const EditProfilePage = ({editProfile}) => {
    const [profileName, setProfileName] = useState(editProfile.name);
    const handleSubmit = () => {

    }

    const handleCancel = () => {

    }

    const handleDelete = () => {

    }


    return (
        <>
        <div className="edit-profile-page">
            <div className="edit-container">
                <div className="edit-content-wrapper">
                    <h1 className="edit-profile-header">Edit Profile</h1>
                    <form className="edit-profile-form">
                        <div className="edit-picture-column">
                            <img className="edit-picture" src={require('../../assets/poro.png')}></img>
                        </div>
                        <div className="edit-name-container">
                            <input className="edit-name-input" type="text" value={profileName} onChange={(e)=>setProfileName(e.target.value)}></input>
                        </div>
                    </form>
                    <button className="save-button" type="submit" onClick={handleSubmit}>Save</button>
                    <button className="not-save-button" type="submit" onClick={handleCancel}>Cancel</button>
                    <button className="not-save-button" type="submit" onClick={handleDelete}>Delete Profile</button>
                </div>
            </div>
        </div>
        </>
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