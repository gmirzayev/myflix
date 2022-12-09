import { setCurrentProfile } from "../../store/session";
import { useDispatch } from "react-redux";
import './ProfileItem.css';

const ProfileItem = (props) => {
    const dispatch = useDispatch();
    const {profile} = props;

    const handleProfilePick = () => {
        dispatch(setCurrentProfile(profile));
    }

    return (
        <li className="profile">
            <div className="profile-item" onClick={handleProfilePick}>
                <div className="profile-picture">
                    {/* <img src={require('../../assets/poro.png')}></img> */}
                </div>
                <span className="profile-name">{profile.name}</span>
            </div>
        </li>
    )

}

export default ProfileItem;