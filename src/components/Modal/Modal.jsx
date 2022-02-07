import React, { useEffect } from 'react';
import "./Modal.scss"
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import Icons from '../Icons/Icons';
// import ModalTitle from "react-bootstrap/ModalTitle";

const PostModal = ({ 
  showPostModal, 
  hidePostModal, 
  postImageUrl,
  postTitle,
  postCreator,
  postSocialNetworkName,
  postUserProfilePicture }) => (
    <Modal show={showPostModal} onHide={hidePostModal} className="w-70" centered>
      <ModalHeader>
        <div className="header-left d-flex">
          <img src={postUserProfilePicture} className="align-self-center" width="40" />
          <div className="d-flex flex-column ms-3">
            <p>{postCreator}</p>
            <p className="text-capitalize">{postSocialNetworkName}</p>
          </div>
        </div>
        {/* <div className="header-right">
          <p>Titre du post</p>
        </div> */}
      </ModalHeader>
      { postImageUrl && <img className="col-md-12 p-3" src={postImageUrl} /> }
      <ModalBody>
        {postTitle}
      </ModalBody>
      <ModalFooter>
        <Icons hasBackground={false} />
      </ModalFooter>
    </Modal>
  )

export default PostModal;
