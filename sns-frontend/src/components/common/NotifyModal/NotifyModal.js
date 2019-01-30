import React, { Component } from "react";
import "./NotifyModal.scss";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "lib/Spinner";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");
  return ReactDOM.createPortal(children, el);
};

class EachNotification extends Component {
  state = {
    nickname: null,
    pic: null,
    postpic: null,
    style: {
      color: "black"
    }
  };
 

  async componentDidMount() {
    const { isChecked, userid, postid } = this.props;
    const style = isChecked ? { color: "gray" } : { color: "black" };

    const [nickname, pic, getPostInfo] = await Promise.all([
      await axios.post("/post/getNick", { userid }),
      await axios.post("/post/getUserPic", { userid }),
      await axios.post("/post/getSinglePost", { postid }),
      await axios.post("/post/togglenotification", {
        userid: Number(localStorage.getItem("id"))
      })
    ]);

    



    // 0131 이렇게 뺐음
    const postpic = getPostInfo.data ? getPostInfo.data.img : null;
    const postUserId = getPostInfo.data ? getPostInfo.data.userId : null;
  
    this.setState({
      nickname: nickname.data,
      pic: pic.data,
      postpic: postpic,
      postUserId: postUserId,
      style
    });
  }

  handleClick = () => {
    const { history, postid, handleCloseModal } = this.props;
    const { postUserId } = this.state;

    handleCloseModal();
    history.push(`/user/${postUserId}/${postid}`);
  };

  render() {
    const { nickname, pic, postpic } = this.state;
    const { category } = this.props;

    if (nickname && typeof pic === 'string' && postpic)
      return (
        <div className="each-noti" onClick={this.handleClick}>
          <img
            src={pic ? pic : "https://myspace.com/common/images/user.png"}
            alt=""
            className="img"
          />
          <div className="word" style={this.state.style}>
            <div className="nickname">{nickname}</div>님이{" "}
            {category === "like"
              ? "게시물을 좋아합니다."
              : "게시물에 댓글을 남겼습니다."}
          </div>
          <img src={postpic} alt="" className="postpic" />
        </div>
      );
    else
      return (
        <div onClick={this.handleClick}>
          <Spinner ph={45} />
        </div>
      );
  }
}

class NotifyModal extends Component {
  
  componentWillReceiveProps(nextProps){

  }
  
  handleCloseModal = () => {
    this.props.handleToggle();
  };

  render() {
    const { notifications } = this.props;

    const flist = notifications.map(item => (
      <EachNotification
        userid={item.notifying}
        postid={item.post}
        category={item.category}
        history={this.props.history}
        handleCloseModal={this.handleCloseModal}
        isChecked={item.isChecked}
      />
    ));

    return (
      <ModalPortal>
        <div className="notify-modal">
          <div className="content">
            <h3>Notifications</h3>

            {notifications === "loading" && <Spinner ph={520} /> }
            {notifications[0] ? (
              <div className="notifications">{flist}</div>
            ) : (
              <div className="notifications" style={{fontSize : "1.5rem", fontWeight : "500"}}>알림이 없습니다.<br/>새 게시글을 올려보세요.</div>
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
