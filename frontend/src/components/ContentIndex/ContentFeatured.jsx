import './ContentFeatured.css';

const ContentFeatured = ({content}) => {
    return (
        <div className="featured-banner-container">
            <div className="featured-banner">
                <img src={require('../../assets/gudetama-text.png')} className="featured-banner-text" />
                <img src={require('../../assets/gudetama-featured.webp')} className="featured-banner-picture"/>
            </div>
            <div className="banner-transition">
            </div>
        </div>
    )
}

export default ContentFeatured;