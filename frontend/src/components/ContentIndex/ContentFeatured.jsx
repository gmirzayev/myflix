import './ContentFeatured.css';
import { useHistory } from "react-router-dom";

const ContentFeatured = ({content}) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/browse/video/${content.id}`)
    }

    return (
        <div className="featured-banner-container">
            <div className="featured-banner">
                <div className="featured-info-container">
                    <img src={require('../../assets/gudetama-text.png')} className="featured-banner-text" />
                    <div className="featured-info-wrapper">
                        <button onClick={handleClick} className="info-play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
                            </svg>
                            <span>Play</span>
                        </button>
                    </div>
                </div>
                <img src={require('../../assets/gudetama-featured.webp')} className="featured-banner-picture"/>
            </div>
            <div className="banner-transition">
            </div>
        </div>
    )
}

export default ContentFeatured;