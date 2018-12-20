import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import {Link, withRouter} from 'react-router-dom'

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

class Modal extends Component {
 
  handleOpenModal = () => {
    this.props.handleModal(true)
  };
  handleCloseModal = () => {    
    this.props.handleModal(false)
  };

  showProfile = (id) => {
    this.handleCloseModal()
    this.props.history.push(`/user/${id}`)
  }

  render() {    
    const { check, list } = this.props
    
    if(this.props.open === true){    
      const flist = list.map(item=> {
        return (
          <div key={item.id} style={{display :"flex", justifyContent : "space-between"}}>
            <div>
              {item.nick}                  
            </div>
            <div className="show-profile"  onClick={()=> {this.showProfile(item.id)}}>
              showProfile
            </div>            
          </div>
          )
      })
      
    return (
      <ModalPortal>
        <div className="modal">
          <div className="content">
            <center><h3>{check}</h3></center>
            {flist}
            <br/>
            <center><button onClick={this.handleCloseModal}>close</button></center>
          </div>
        </div>
      </ModalPortal>
    );
  }else{
    return null
  }

}
}

export default withRouter(Modal)
