import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProfilePage from "../ProfilePage";
import './browse.css';
import Navigation from "./Navigation";
import { csrfFetch } from "../../store/csrf";

import { useState, useEffect } from 'react';
import VideoShow from './VideoShow.jsx';
import ContentIndex from "../ContentIndex";

const BrowsePage = () => {
    const sessionProfile = useSelector(state => state.session.profile);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await csrfFetch("/api/videos");
          setVideo(await res.json());
        }
        fetchPosts();
      }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    // if (!sessionProfile) return <Redirect to="/profiles" />;

    return ( 
        <>
            {sessionProfile ? 
            (<div className="browse-page" id="browse-page">
                <Navigation />
                <div className="browse-main">
                    <ContentIndex />
                </div>
            </div>) : 
            <ProfilePage editable={false}/>
            }
        </>
    )

}

export default BrowsePage;