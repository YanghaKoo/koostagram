import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";
import Hashtag from "../../post/Hashtag/Hashtag";
import Spinner from "../../../lib/Spinner";
import likeImage from "../../../images/like.png";

class EachFeed extends Component {
  state = {
    nick: "",
    likeCounts: 0,
    profilePic: "",
    isLoading: false
  };

  componentDidMount() {
    this.initializer();
  }

  // 이니셜라이저, 요청하는 부분
  initializer = async () => {
    this.setState({ isLoading: true });

    const { id } = this.props;
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });

    const likeCounts = await axios.post("/post/getLikeCount", { postid: id });
    const profilePic = await axios.post("/post/getUserPic", {
      userid: this.props.userid
    });
    this.setState({ isLoading: false });
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

  // makeHashTag = content => {
  //   return content.replace(/#[^\s]*/g, "테스트");
  // };

  render() {
    const { img, date, content, userid, history } = this.props;
    const { nick, likeCounts, profilePic } = this.state;
    const time = date.substr(11, 12).substr(0, 5);

    if (this.state.isLoading) {
      return <Spinner width="100px" height="100px" pw="100%" ph="90vh" />;
    }

    let contentWithHashtag;
    if (content) {
      contentWithHashtag = content.split(" ");
      contentWithHashtag = contentWithHashtag.map(item => {
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
                src={likeImage}
                width={30}
                height={30}
                alt=""
                style={{ marginTop: "5px", marginRight : "5px" }}
              />
              <div style={{ width: "100%" }}>{likeCounts}</div>{" "}
            </div>
            <div className="test">{contentWithHashtag}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default EachFeed;
