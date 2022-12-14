import './ContentFeatured.css';

const ContentFeatured = ({content}) => {
    return (
        <div class="featured-banner-container">
            <div class="featured-banner">
                <img src={require('../../assets/ArcaneImage.jpeg')} className="featured-banner-picture"/>
            </div>
        </div>
    )
}

export default ContentFeatured;