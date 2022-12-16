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
    const [changePicture, setChangePicture] = useState(false);
    const [errors, setErrors] = useState([]);

    if (sessionProfile) return <Redirect to="/browse" />;

    const handleSubmit = () => {
        if(profileName.length > 0) {
            const profile = {name: profileName, picture: "placeholder.png"};
            if(newProfile) {
                setErrors([]);
                return dispatch(profileActions.createProfile(profile))
                    .then(setShowProfile(false))
                    .catch(async (res) => {
                        let data = await res;
                        try {
                            // .clone() essentially allows you to read the response body twice
                            data = await res.clone().json();
                            debugger
                          } catch {
                            data = await res.text(); // Will hit this case if the server is down
                          }
                          if (data?.errors) setErrors(data.errors);
                          else if (data) setErrors([data]);
                          else setErrors([res.statusText]);
                    });
            } else {
                dispatch(profileActions.updateProfile({...editProfile, ...profile}));
                setShowProfile(false);
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
        {changePicture ? 
            // <div className="change-picture-container">
            //     <div className="picture-header">
            //         <div className="back-wrapper">
            //             <div className="back-button">
                        <svg className="back-arrow" width="519" height="146" viewBox="0 0 519 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                <path d="M130.2188 386.1562 L9.2812 315 L9.2812 290.8125 L130.2188 219.6562 L130.2188 245.3906 L33.4688 302.9062 L130.2188 360.5625 L130.2188 386.1562 Z" stroke="none" />
                                </g>
                            </g>
                        </svg>
            //         </div>
            //     </div>
            // </div>
                
            // </div> 
            : 
            <div className="edit-profile-page">
             <div className="edit-container">
                 <div className="edit-content-wrapper">
                     <h1 className="edit-profile-header">{newProfile ? "Create a New Profile" : "Edit Profile"}</h1>
                     <form className="edit-profile-form">
                         <div className="edit-picture-column">
                             <img className="edit-picture" src={require('../../assets/poro.png')}></img>
                             <button className="picture-edit-button" onClick={() => setChangePicture(true)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="change-svg">
                                    <path d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z" fill="currentColor"></path>
                                </svg>
                             </button>
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
         </div> }
        </>
    )
}

export default EditProfilePage;