import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";
import Hashtag from "../../post/Hashtag/Hashtag";
import Spinner from "../../../lib/Spinner";
import EachFeedComment from "../EachFeedComment";

const unlikeImage =
  "https://cdn1.iconfinder.com/data/icons/valentine-s-day-simplicity/512/empty_heart-512.png";
const likeImage =
  "https://cdn1.iconfinder.com/data/icons/love-icons/512/love-heart-512.png";
const commentImage =
  "https://cdn4.iconfinder.com/data/icons/vectory-basic/40/comment_2-512.png";

class EachFeed extends Component {
  state = {
    nick: "",
    likeCounts: 0,
    profilePic: "",
    isLoading: false,
    like: unlikeImage,
    commentsCount: 0,
    commentToggle: 0
  };

  componentDidMount() {
    this.initializer();
  }

  // 이니셜라이저, 요청하는 부분
  initializer = async () => {
    this.setState({ isLoading: true });

    const { id, loggedInUser: user } = this.props;
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });

    const likeCounts = await axios.post("/post/getLikeCount", { postid: id });
    const commentsCount = await axios.post("/post/getComments", { postid: id });
    const profilePic = await axios.post("/post/getUserPic", {
      userid: this.props.userid
    });

    //console.log(nick.data)
    this.setState({
      nick: nick.data,
      likeCounts: likeCounts.data.length,
      profilePic: profilePic.data,
      commentsCount: commentsCount.data.length
    });

    if (user) {
      likeCounts.data.map(item => {
        if (item.id === user.id) {
          this.setState({
            like: likeImage
          });
        }
      });
    }
    this.setState({ isLoading: false });
  };

  handleClick = () => {
    const { history, id: postid, userid } = this.props;
    history.push(`/user/${userid}/${postid}`);
  };

  handleLikeClick = () => {
    const { id: postid, loggedInUser } = this.props;
    
    if(!loggedInUser) {
      alert('좋아요는 로그인 후에 가능합니다.')
      return
    }

    if (this.state.like === unlikeImage) {
      this.setState({
        like: likeImage,
        likeCounts: this.state.likeCounts + 1
      });
      axios.post("/post/like", { userid: loggedInUser.id, postid });
    } else {
      this.setState({
        like: unlikeImage,
        likeCounts: this.state.likeCounts - 1
      });
      axios.post("/post/unlike", { userid: loggedInUser.id, postid });
    }
  };

  toggleComment = () => {
    const { commentToggle } = this.state;
    const {loggedInUser} = this.props

    if(!loggedInUser) {
      alert('댓글 작성은 로그인 후에 가능합니다.')
      return
    }

    this.setState({
      commentToggle: !commentToggle
    });
  };



  handleCommentAction = () => {
    const { commentsCount } = this.state;
    this.setState({
      commentsCount: commentsCount + 1,
      commentToggle: 0
    });
  };

  render() {
    const { img, date, content, userid, history } = this.props;
    const { nick, likeCounts, profilePic, like, commentsCount } = this.state;
    const time = date.substr(11, 12).substr(0, 5);
    
    

    if (this.state.isLoading) {
      return <Spinner width="100px" height="100px" pw="100%" ph="90vh" />;
    }

    let contentWithHashtag;
    if (content) {
      contentWithHashtag = content.split(/\s+/); // space or newline으로 나눠줌
      contentWithHashtag = contentWithHashtag.map(item => {
        // console.log(item)
        if (item[0] === "#" && item.length > 1) {
          return (
            <div>
              <Hashtag hashtag={item} history={this.props.history} />
            </div>
          );
        }
        return <div className="word">{item}</div>;
      });
    }

    return (
      <div className="each-feed">
        <div className="top">
          <div
            className="left"
            onClick={() => {
              history.push(`/user/${userid}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="profile-pic">
              {profilePic ? <img src={profilePic} alt="" /> : null}
            </div>
            {nick}
          </div>
          <div className="right">
            {date.substr(0, 10)} {time}
          </div>
        </div>
        <div className="img-area">
          <div onClick={this.handleClick} className="onimg">
            <img src={img} alt="" />
          </div>
          <div className="bottom">
            <div className="comment-area">
              <img
                src={like}
                width={30}
                height={30}
                alt=""
                style={{
                  cursor: "pointer",
                  marginTop: "5px",
                  marginRight: "5px",
                  marginLeft: "-10px"
                }}
                onClick={this.handleLikeClick}
              />
              <div style={{ width: "100%" }}>{likeCounts}</div>{" "}
              <img
                src={commentImage}
                width={30}
                height={30}
                alt=""
                style={{ marginTop: "5px", marginLeft: "10px", cursor: "pointer"}}
                onClick={this.toggleComment}
              />
              <div className="cCount">{commentsCount}</div>
            </div>
            <div className="test">{contentWithHashtag}</div>
            {this.state.commentToggle ? (
              <EachFeedComment
                handleCommentAction={this.handleCommentAction}
                user={this.props.loggedInUser}
                id={this.props.id}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EachFeed;
