import './ProfileNewItem.css';

const ProfileNewItem = ({setEditProfile, setShowProfile}) => {
    const handleProfileNew = () => {
        setEditProfile({new:"new"});
        setShowProfile(true);
    }

    return (
        <li className="profile">
            <div className="profile-item" onClick={handleProfileNew}>
                <div className="blank-profile-picture">
                    {/* <img src={require('../../assets/poro.png')}></img> */}
                </div>
                <span className="profile-name">Create new profile</span>
            </div>
        </li>
    )

}

export default ProfileNewItem;