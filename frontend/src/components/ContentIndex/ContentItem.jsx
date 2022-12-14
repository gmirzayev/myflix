import './ContentItem.css';
import { useState } from 'react';
import ContentModal from './ContentModal';
import { useHistory } from "react-router-dom";

const ContentItem = ({test, content}) => {
    const [showModal, setShowModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const history = useHistory();

    const handleClick = () => {
        history.push(`/browse/video/${content.id}`)
    }

    return (
        <div className="content-item-container">
            {test}
            <div className="content-image-wrapper">
                <img src={require('../../assets/ArcaneImage.jpeg')} onMouseEnter={()=>{setPreviewModal(true)}} onClick={handleClick} className="content-item-picture"/>
            </div>
            {/* <ContentModal showModal={showModal} setShowModal={setShowModal} content={content}/> */}
            {previewModal && <ContentModal content={content} handleClick={handleClick} onExit={() => setPreviewModal(false)}/>}
        </div>
    )
}

export default ContentItem;