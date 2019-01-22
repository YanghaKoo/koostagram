import React, { Component } from "react";
import "./NotifyModal.scss";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

class EachNotification extends Component {
  state = {
    nickname: null,
    pic: null,
    postpic: null
  };

  async componentDidMount() {
    const { userid, postid } = this.props;
    const nickname = await axios.post("/post/getNick", { userid });
    const pic = await axios.post("/post/getUserPic", {
      userid
    });
    const getPostInfo = await axios.post("/post/getSinglePost", {
      postid
    });


    this.setState({
      nickname: nickname.data,
      pic: pic.data,
      postpic: getPostInfo.data.img,
      postUserId : getPostInfo.data.userId
    });
  }

  handleClick = () => {
    const { history, postid, handleCloseModal } = this.props;
    const {postUserId} = this.state

    handleCloseModal();
    history.push(`/user/${postUserId}/${postid}`);
  };

  render() {
    const { nickname, pic, postpic } = this.state;
    const { category } = this.props;

    if (!(nickname && pic && postpic))
      return (
        <div className="each-noti" onClick={this.handleClick}>                    
          <div className="word">
            loading...
          </div>          
        </div>
      );

    if (nickname && pic && postpic)
      return (
        <div className="each-noti" onClick={this.handleClick}>
          <img src={pic} alt="" className="img" />
          <div className="word">
            <div className="nickname">{nickname}</div>님이{" "}
            {category === "like"
              ? "게시물을 좋아합니다."
              : "게시물에 댓글을 남겼습니다."}
          </div>
          <img src={postpic} alt="" className="postpic" />
        </div>
      );
  }
}

class NotifyModal extends Component {
  state = {
    notifications: []
  };

  async componentDidMount() {
    const userid = Number(localStorage.getItem("id"));
    const myNotifications = await axios.post("/post/notification", { userid });

    this.setState({
      notifications: myNotifications.data
    });
  }

  handleCloseModal = () => {
    this.props.handleToggle();
  };

  render() {
    const { notifications } = this.state;

    const flist = notifications.map(item => (
      <EachNotification
        userid ={item.notifying}
        postid={item.post}
        category={item.category}
        history={this.props.history}
        handleCloseModal={this.handleCloseModal}
      />
    ));

    return (
      <ModalPortal>
        <div className="notify-modal">
          <div className="content">
            <h3>Notifications</h3>

            {notifications[0] ? (
              <div className="notifications">{flist}</div>
            ) : (
              <div className="notifications">loading...</div>
            )}
            <div>
              <button onClick={this.handleCloseModal} className="close">
                Close
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    );
  }
}

export default withRouter(NotifyModal);
