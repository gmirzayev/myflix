import './ContentItem.css';
import { useState } from 'react';
import ContentModal from './ContentModal';

const ContentItem = ({test, content}) => {
    const [previewModal, setPreviewModal] = useState(false);
    // const liked = useSelector(likeActions.getLike(content.id));

    return (
        <div className="content-item-container">
            {test}
            <div className="content-image-wrapper">
                <img src={require('../../assets/ArcaneImage.jpeg')} onMouseEnter={()=>{setPreviewModal(true)}} className="content-item-picture"/>
            </div>
            {/* <ContentModal showModal={showModal} setShowModal={setShowModal} content={content}/> */}
            {previewModal && <ContentModal content={content} onExit={() => setPreviewModal(false)}/>}
        </div>
    )
}

export default ContentItem;