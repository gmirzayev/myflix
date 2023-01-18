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
        <div className="video-page">
            <button className="video-back-button" onClick={handleBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11.0001L3.41421 11.0001L8.70711 5.70718L7.29289 4.29297L0.292892 11.293C0.105356 11.4805 0 11.7349 0 12.0001C0 12.2653 0.105356 12.5196 0.292892 12.7072L7.29289 19.7072L8.70711 18.293L3.41421 13.0001H24V11.0001Z" fill="currentColor"></path></svg>
            </button>
            <video className="full-video" controls src={require('../../assets/Arcane_s1e1.mp4')}/>
        </div>
    )
}

export default VideoShowPage;