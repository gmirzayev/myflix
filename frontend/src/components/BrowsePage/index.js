import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProfilePage from "../ProfilePage";
import './browse.css';
import Navigation from "./Navigation";

const BrowsePage = () => {
    const sessionProfile = useSelector(state => state.session.profile);
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/login" />;

    // if(!sessionProfile) return <Redirect to="/profiles" />;

    return ( 
        <>
            {sessionProfile ? 
            (<div className="browse-page">
                <Navigation />
                <div className="browse-main">
                    <span>Browse</span>
                </div>
            </div>) : 
            <ProfilePage />
            }
        </>
    )

}

export default BrowsePage;