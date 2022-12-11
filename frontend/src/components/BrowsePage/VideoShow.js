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
        // key={video.video[0].id}
        
        
    )
}

// '/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e8f2def38c1d70851ae968030451d143b3ab7272/Arcane_s1e1.mp4'

export default VideoShow;