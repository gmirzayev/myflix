import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './ContentModal.css';
import ModalContentItem from '../ModalContentItem';
// {showModal, setShowModal}
const ContentModal = ({showModal, setShowModal, content}) =>  {
    // debugger
  return (
    <>
        <button onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
        <Modal className="content-modal" onClose={() => setShowModal(false)} >
            {/* nMouseExit={setShowModal(true)} */}
            <ModalContentItem content={content}/>
        </Modal>
      )}
    </>
  );
}

export default ContentModal;