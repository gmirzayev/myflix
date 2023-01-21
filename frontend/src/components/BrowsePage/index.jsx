import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from 'react-router-dom';

import './browse.css';
import ProfilePage from "../ProfilePage";
import Navigation from "./Navigation";
import ContentIndex from "../ContentIndex";
import Footer from "../Footer";
import { fetchProfiles } from '../../store/profiles';


const BrowsePage = () => {
    const sessionProfile = useSelector(state => state.session.profile);
    const sessionUser = useSelector(state => state.session.user);
    const {filter} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles());
      }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;

    return ( 
        <>
            {sessionProfile ? 
            (<div className="browse-page" id="browse-page">
                <Navigation />
                <div className="browse-main">
                    <ContentIndex filter={filter} sessionProfile={sessionProfile}/>
                </div>
                <Footer />
            </div>) : 
            <ProfilePage editable={false}/>
            }
        </>
    )

}

export default BrowsePage;