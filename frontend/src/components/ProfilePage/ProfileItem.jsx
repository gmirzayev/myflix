import { setCurrentProfile, storeCurrentProfile } from "../../store/session";
import { useDispatch } from "react-redux";
import './ProfileItem.css';

const ProfileItem = (props) => {
    const dispatch = useDispatch();
    const {profile, editable, setShowProfile, setEditProfile} = props;

    const handleProfilePick = () => {
        dispatch(setCurrentProfile(profile));
        storeCurrentProfile(profile);
    }

    const handleProfileEdit = () => {
        setEditProfile(profile);
        setShowProfile(true);
    }

    return (
        <li className="profile">
            <div className="profile-item" onClick={editable ? handleProfileEdit : handleProfilePick}>
                <div>
                    <img className="profile-picture" src={profile ? `${profile.picture}` : require('../../assets/poro.png')}></img>
                </div>
                {editable && <div className="edit-overlay"></div>}
                <span className="profile-name">{profile.name}</span>
            </div>
        </li>
    )

}

export default ProfileItem;