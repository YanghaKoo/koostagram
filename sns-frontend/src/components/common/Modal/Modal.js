import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import { withRouter } from "react-router-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

class Modal extends Component {
  handleOpenModal = () => {
    this.props.handleModal(true);
  };
  
  handleCloseModal = () => {
    this.props.handleModal(false);
  };

  showProfile = id => {
    this.handleCloseModal();
    this.props.history.push(`/user/${id}`);
  };

  render() {
    // check : modal의 제목(Follower인지 Following 인지 구분)
    // list : Following(Follower) 목록
    // open : true일 때 모달을 열어줌
    const { check, list, open } = this.props;

    // first : 넘어온 list로 목록을 구성해 줌
    if (open === true) {
      const flist = list.map(item => {
        
        return (
          <div
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
            onClick={() => {
              this.showProfile(item.id);
            }}
            className="each-user"
          >
            <div>
              <img src={item.pic ? item.pic : "https://myspace.com/common/images/user.png"} className="img" alt=""/>
            </div> 
            <div className="nick">{item.nick}</div>            
          </div>
        );
      });


      return (
        <ModalPortal>
          <div className="modal">
            <div className="content">
              <center>
                <h3>{check}</h3>
              </center>
              <div className="flist">{flist}</div>
              <br />
              <center>
                <button onClick={this.handleCloseModal} className="close">Close</button>
              </center>
            </div>
          </div>
        </ModalPortal>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Modal);
