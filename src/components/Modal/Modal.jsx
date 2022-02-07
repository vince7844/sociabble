import React, { useEffect } from 'react';
import "./Modal.scss"
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";


const PostModal = ({ 
  showPostModal, 
  hidePostModal, 
  postImageUrl,
  postTitle,
  postCreator,
  postUserProfilePicture }) => (
    <Modal show={showPostModal} centered>
      <ModalHeader>
        <img src={postUserProfilePicture} width="10" height="10" />
        <ModalTitle>{postCreator}</ModalTitle>
      </ModalHeader>
      <img src={postImageUrl} />
      <ModalBody>
        {postTitle}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={hidePostModal}>Cancel</button>
      </ModalFooter>
    </Modal>
  )

export default PostModal;
