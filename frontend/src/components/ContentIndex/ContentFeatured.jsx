import './ContentFeatured.css';

const ContentFeatured = ({content}) => {
    return (
        <div className="featured-banner-container">
            <div className="featured-banner">
                <img src={require('../../assets/ArcaneImage.jpeg')} className="featured-banner-picture"/>
            </div>
        </div>
    )
}

export default ContentFeatured;