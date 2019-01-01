import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";
//import CommentContainer from "../../../containers/user/CommentContainer";

class EachFeed extends Component {
  state = {
    nick: "",
    likeCounts: 0,
    profilePic: ""
  };

  componentDidMount() {
    this.initializer();
  }

  initializer = async () => {
    const { id } = this.props;
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });

    const likeCounts = await axios.post("/post/getLikeCount", { postid: id });
    const profilePic = await axios.post("/post/getUserPic", {
      userid: this.props.userid
    });

    console.log(likeCounts.data);

    //console.log(nick.data)
    this.setState({
      nick: nick.data,
      likeCounts: likeCounts.data.length,
      profilePic: profilePic.data
    });
  };

  handleClick = () => {
    const { history, id: postid, userid } = this.props;
    history.push(`/user/${userid}/${postid}`);
  };

  makeHashTag = content => {
    return content.replace(/#[^\s]*/g, "테스트");
  };

  render() {
    const { img, date, content, userid, history } = this.props;
    const { nick, likeCounts, profilePic } = this.state;
    const time = date.substr(11, 12).substr(0, 5);

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
          <div className="comment-area">{likeCounts} likes</div>
          <div className="content-area">{content ? content : null}</div>
        </div>        
      </div>
    );
  }
}

export default EachFeed;
