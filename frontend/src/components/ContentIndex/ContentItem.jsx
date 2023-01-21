import './ContentItem.css';
import { receiveModal, removeModal } from '../../store/modalContent';
import { useDispatch } from "react-redux";

const ContentItem = ({content}) => {
    const dispatch = useDispatch();

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
            modal.style.marginLeft = "5%";
            modal.style.marginRight = "0";
        } 
        else if(window.innerWidth - position.right < 100) {
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
        </div>
    )
}

export default ContentItem;