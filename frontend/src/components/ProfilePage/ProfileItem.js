import { setCurrentProfile, storeCurrentProfile } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './ProfileItem.css';

const ProfileItem = (props) => {
    const dispatch = useDispatch();
    const {profile, editable} = props;
    const history = useHistory();

    const handleProfilePick = () => {
        dispatch(setCurrentProfile(profile));
        dispatch(storeCurrentProfile(profile));
    }

    const handleProfileEdit = () => {
        history.push('/')
    }

    return (
        <li className="profile">
            <div className="profile-item" onClick={editable ? handleProfileEdit : handleProfilePick}>
                <div className="profile-picture">
                    {/* <img src={require('../../assets/poro.png')}></img> */}
                </div>
                <span className="profile-name">{profile.name}</span>
            </div>
        </li>
    )

}

export default ProfileItem;