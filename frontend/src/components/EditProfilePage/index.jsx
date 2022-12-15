import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './EditProfile.css';
import * as profileActions from "../../store/profiles";

const EditProfilePage = ({editProfile, setShowProfile}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const newProfile = editProfile.new === "new" ? true : false;
    const [profileName, setProfileName] = useState(newProfile ? "" : editProfile.name);
    const sessionProfile = useSelector(state => state.session.profile);
    const [errors, setErrors] = useState([]);

    if (sessionProfile) return <Redirect to="/browse" />;

    const handleSubmit = () => {
        if(profileName.length > 0) {
            const profile = {name: profileName, picture: "placeholder.png"};
            if(newProfile) {
                setErrors([]);
                return dispatch(profileActions.createProfile(profile))
                    .catch(async (res) => {
                        let data = await res;
                        // try {
                            // .clone() essentially allows you to read the response body twice
                            data = await res.clone().json();
                        //   } catch {
                        //     data = await res.text(); // Will hit this case if the server is down
                        //   }
                          if (data?.errors) setErrors(data.errors);
                          else if (data) setErrors([data]);
                          else setErrors([res.statusText]);
                    });
            } else {
                dispatch(profileActions.updateProfile(...editProfile, ...profile));
            }
            // setShowProfile(false);
        }
    }

    const handleCancel = () => {
        setShowProfile(false);
    }

    const handleDelete = () => {
        dispatch(profileActions.deleteProfile(editProfile.id));
        setShowProfile(false);
    }


    return (
        <>
        <div className="edit-profile-page">
            <div className="edit-container">
                <div className="edit-content-wrapper">
                    <h1 className="edit-profile-header">{newProfile ? "Create a New Profile" : "Edit Profile"}</h1>
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
                    {!newProfile && <button className="not-save-button" type="submit" onClick={handleDelete}>Delete Profile</button>}
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