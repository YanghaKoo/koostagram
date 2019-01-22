import React, { Component } from 'react';
import './NotifyModal.scss'
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import axios from 'axios'

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

class NotifyModal extends Component {
  handleOpenModal = () => {
    this.props.handleModal(true);
  };
  
  handleCloseModal = () => {
    this.props.handleToggle();
  };

  showProfile = id => {
    this.handleCloseModal();
    this.props.history.push(`/user/${id}`);
  };

  render() {


      return (
        <ModalPortal>
          <div className="notify-modal">
            <div className="content">
              <h3>Notifications</h3>
              
              <div className="notifications">
                여기에 알림을 리스트로 표시할거임
              </div>
              <div>
                <button onClick={this.handleCloseModal} className="close">Close</button>
              </div >
            </div>
          </div>
        </ModalPortal>
      );
    }
  }


export default withRouter(NotifyModal);
