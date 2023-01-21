import './VideoShow.css';

const VideoShow = (video) => {
    return (
        <>
            {video.video[0] && 
            <li key={video.video[0].id}>
                <h2>{video.video[0].title}</h2>
                <video className="video" src={video.video[0].videoUrl}/>
            </li>}
        </>
        
        
    )
}

export default VideoShow;