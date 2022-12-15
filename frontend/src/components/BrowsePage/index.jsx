import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";

import './browse.css';
import ProfilePage from "../ProfilePage";
import Navigation from "./Navigation";
import ContentIndex from "../ContentIndex";
import { fetchProfiles } from '../../store/profiles';


const BrowsePage = () => {
    const sessionProfile = useSelector(state => state.session.profile);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        // const fetchPosts = async () => {
        //   const res = await csrfFetch("/api/videos");
        //   setVideo(await res.json());
        // }
        // fetchPosts();
        dispatch(fetchProfiles());

      }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    // if (!sessionProfile) return <Redirect to="/profiles" />;

    return ( 
        <>
            {sessionProfile ? 
            (<div className="browse-page" id="browse-page">
                <Navigation />
                <div className="browse-main">
                    <ContentIndex sessionProfile={sessionProfile}/>
                </div>
            </div>) : 
            <ProfilePage editable={false}/>
            }
        </>
    )

}

export default BrowsePage;