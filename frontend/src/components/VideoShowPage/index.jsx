import './VideoShow.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from "react";
import * as videoActions from '../../store/videos';

const VideoShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const videoId = useParams();
    const video = useSelector(videoActions.getVideo(videoId));
    useEffect(() => {
        dispatch(videoActions.fetchVideo(videoId));
    }, [dispatch])

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div>
            <button className="video-back-button" onClick={handleBack}>Go back from {video && video.title}</button>
            <video className="full-video" controls src={require('../../assets/Arcane_s1e1.mp4')}/>
        </div>
    )
}

export default VideoShowPage;