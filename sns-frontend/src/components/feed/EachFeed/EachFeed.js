import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";
import Hashtag from "../../post/Hashtag/Hashtag";
import Spinner from "../../../lib/Spinner";
import EachFeedComment from "../EachFeedComment";
import Mention from "../../post/Mention/Mention";
// `import CommentContainer from '../../../containers/user/CommentContainer'`

// 이미지 url, 좋아요, 좋아요 취소, 댓글 모양
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

  // 최초에 정보들을 서버로부터 요청해서 받아와서 정리해줌
  initializer = async () => {
    this.setState({ isLoading: true });

    const { id, userid } = this.props;
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });

    // 한꺼번에 필요 정보 가져오기
    const [likeCounts, commentsCount, profilePic] = await Promise.all([
      axios.post("/post/getLikeCount", { postid: id }),
      axios.post("/post/getComments", { postid: id }),
      axios.post("/post/getUserPic", { userid })
    ])

    this.setState({
      nick: nick.data,
      likeCounts: likeCounts.data.length,
      profilePic: profilePic.data,
      commentsCount: commentsCount.data.length
    });

    if (localStorage.getItem("id")) {
      likeCounts.data.forEach(item => {
        if (item.id === Number(localStorage.getItem("id"))) {
          this.setState({
            like: likeImage
          });
        }
      });
    }

    this.setState({ isLoading: false });
  };

  // 클릭했을 때 실제 게시물로 이동시키기
  handleClick = () => {
    const { history, id: postid, userid } = this.props;
    history.push(`/user/${userid}/${postid}`);
  };

  // like/unlike
  handleLikeClick = () => {
    const { id: postid } = this.props;

    if (!localStorage.getItem("id")) {
      alert("좋아요는 로그인 후에 가능합니다.");
      return;
    }

    if (this.state.like === unlikeImage) {
      this.setState({
        like: likeImage,
        likeCounts: this.state.likeCounts + 1
      });
      axios.post("/post/like", {
        userid: Number(localStorage.getItem("id")),
        postid
      });
    } else {
      this.setState({
        like: unlikeImage,
        likeCounts: this.state.likeCounts - 1
      });
      axios.post("/post/unlike", {
        userid: Number(localStorage.getItem("id")),
        postid
      });
    }
  };

  toggleComment = () => {
    const { commentToggle } = this.state;
    if (!localStorage.getItem("nick")) {
      alert("댓글 작성은 로그인 후에 가능합니다.");
      return;
    }
    this.setState({
      commentToggle: !commentToggle
    });
  };

  // 각 feed에서 직접 댓글 남길 때
  handleCommentAction = () => {
    const { commentsCount } = this.state;
    this.setState({
      commentsCount: commentsCount + 1,
      commentToggle: 0
    });
  };

  timeConversion = millisec => {
    const seconds = (millisec / 1000).toFixed(0);
    const minutes = (millisec / (1000 * 60)).toFixed(0);
    const hours = (millisec / (1000 * 60 * 60)).toFixed(0);

    if (seconds < 60) {
      return (seconds ? seconds + " sec ago": "방금 전") 
    } else if (minutes < 60) {
      return minutes + " min ago";
    } else if (hours < 24) {
      return hours + " hrs ago";
    }
  };

  render() {
    const { img, date, content, userid, history } = this.props;
    const { nick, likeCounts, profilePic, like, commentsCount } = this.state;

    // 게시글 작성 시간과 현재 시간의 날짜를 구해옴
    const writtenDate = date.substr(0, 10);
    const nowDate = new Date().toISOString().substr(0, 10);

    // n시간 전
    let postTime = null;
    if (writtenDate === nowDate) {
      postTime = this.timeConversion(new Date() - Date.parse(date));
    } else {
      postTime = writtenDate;
    }

    let spinnerSize = "100px";
    if (window.innerWidth < 500) {
      spinnerSize = "50px";
    }

    if (this.state.isLoading) {
      return (
        <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="90vh" />
      );
    }

    let contentWithHashtag;
    if (content) {
      contentWithHashtag = content.split(/\s+/); // space or newline으로 나눠줌
      contentWithHashtag = contentWithHashtag.map(item => {
        if (item[0] === "#" && item.length > 1) {
          return (
            <div>
              <Hashtag hashtag={item} history={this.props.history} />
            </div>
          );
        } else if (item[0] === "@" && item.length > 1) {
          return (
            <div>
              <Mention
                mention={item}
                history={this.props.history}
                match={this.props.match}
              />
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
              <img
                src={
                  profilePic
                    ? profilePic
                    : "https://myspace.com/common/images/user.png"
                }
                alt=""
              />
            </div>
            {nick}
          </div>
          <div className="right">
            <img
              src="https://cdn3.iconfinder.com/data/icons/glyph/141/Alarm-Clock-512.png"
              width={30}
              height={30}
              alt=""
            />

            <span className="span">{postTime}</span>
            {/* {date.substr(0, 10)} {time} */}
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
                style={{
                  marginTop: "5px",
                  marginLeft: "10px",
                  cursor: "pointer"
                }}
                onClick={this.toggleComment}
              />
              <div className="cCount">{commentsCount}</div>
            </div>
            <div className="test">{contentWithHashtag}</div>
            {this.state.commentToggle ? (
              <div>
              <EachFeedComment
                handleCommentAction={this.handleCommentAction}
                id={this.props.id}
                commentsCount={commentsCount}
              />
              
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EachFeed;
