import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
import './ContentModal.css';
import { useHistory } from "react-router-dom";
// import ModalContentItem from '../ModalContentItem';
// // {showModal, setShowModal}
const ContentModal = ({content, onExit}) =>  {
  const history = useHistory();
  // :title, :description, :year, :parental_rating, :category, presence: true

  const handleClick = () => {
    history.push(`/browse/video/${content.id}`)
  }

  return (
    <div className="preview-modal-container" onMouseLeave={() => onExit()}>
      <div className="preview-modal">
        <img src={require('../../assets/ArcaneImage.jpeg')} onClick={handleClick} className="preview-modal-picture"/>
        <div className="preview-modal-info">
          <div className="modal-interaction-row">
            <span>Play</span>
          </div>
          <div className="rating-row">
            <span>{content.parentalRating}</span>
          </div>
          <div className="category-row">
            <span>{content.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
//     // debugger
//   return (
//     <>
//         <button onClick={() => setShowModal(true)}>Log In</button>
//         {showModal && (
//         <Modal className="content-modal" onClose={() => setShowModal(false)} >
//             {/* nMouseExit={setShowModal(true)} */}
//             <ModalContentItem content={content}/>
//         </Modal>
//       )}
//     </>
//   );
// }

export default ContentModal;