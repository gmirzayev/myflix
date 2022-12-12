import './ContentItem.css';
import { useState } from 'react';
import ContentModal from './ContentModal';
import { useHistory } from "react-router-dom";

const ContentItem = ({content}) => {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handleClick = () => {
        history.push(`/browse/video/${content.id}`)
    }

    return (
        <div className="content-item-container" onClick={handleClick}>
            <img src={require('../../assets/ArcaneImage.jpeg')} className="content-item-picture"/>
            <ContentModal showModal={showModal} setShowModal={setShowModal} content={content}/>
        </div>
    )
}

export default ContentItem;