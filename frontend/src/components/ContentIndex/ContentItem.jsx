import './ContentItem.css';
import { useState } from 'react';
import ContentModal from './ContentModal';
import { receiveModal, removeModal } from '../../store/modalContent';
import { useSelector, useDispatch } from "react-redux";

const ContentItem = ({content, setPreviewModal}) => {
    const dispatch = useDispatch();
    // const [previewModal, setPreviewModal] = useState(false);
    // debugger
    // const liked = useSelector(likeActions.getLike(content.id));

    const handleOpenModal = () => {
        dispatch(removeModal());
        dispatch(receiveModal(content));
        const modal = document.getElementById('test-modal');
        modal.style.display = "block";
        const item = document.getElementById(`${content.id}-item`);
        let position;
        if(item) {
            position = item.getBoundingClientRect();
        }
        modal.style.top = `${position.top + window.scrollY - 50}px`;
        modal.style.left = `${position.left - 20}px`;
        if(position.left < 50) {
            // modal.style.left = `${position.left + 30}px`;
            modal.style.marginLeft = "5%";
            modal.style.marginRight = "0";
        } 
        else if(window.innerWidth - position.right < 100) {
            // modal.style.marginLeft = "0";
            // modal.style.marginRight = "50%";
            modal.style.left = `${position.left - 110}px`;
        } else {
            modal.style.marginLeft = "0";
            modal.style.marginRight = "0";
        }
    }

    return (
        <div className="content-item-container" id={`${content.id}-item`}>
            <div className="content-image-wrapper">
                <img alt={content.title} src={content.photoUrl ? content.photoUrl : require('../../assets/ArcaneImage.jpeg')} onMouseEnter={handleOpenModal} className="content-item-picture"/>
            </div>
            {/* <ContentModal showModal={showModal} setShowModal={setShowModal} content={content}/> */}
            {/* {previewModal && <ContentModal content={content} onExit={() => setPreviewModal(false)}/>} */}
            
        </div>
    )
}

export default ContentItem;