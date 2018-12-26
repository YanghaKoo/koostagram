import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";

class EachFeed extends Component {
  state = {
    nick: "",
    likeCounts : 0
  };

  componentDidMount() {
    this.initializer();
  }

  initializer = async () => {
    const { id } = this.props
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });

    const likeCounts = await axios.post("/post/getLikeCount", {postid : id})
    console.log(likeCounts.data)

    //console.log(nick.data)
    this.setState({
      nick: nick.data,
      likeCounts : likeCounts.data.length
    });
  };

  handleClick = () => {
    const { history, id: postid, userid } = this.props;
    history.push(`/user/${userid}/${postid}`);
  };

  render() {
    const { img, date, content } = this.props
    const { nick, likeCounts } = this.state;
    const time = date.substr(11, 12).substr(0, 5);

    return (
      <div className="each-feed">
        <div className="top">
          <div className="left">
            <div className="profile-pic" />
            {nick}
          </div>
          <div className="right">
            {date.substr(0, 10)} {time}
          </div>
        </div>
        <div className="img-area" onClick={this.handleClick}>
          <img src={img} alt=""/>
          <div className="content-area">{content ? content : null}</div>
        </div>
        <div className="comment-area">{likeCounts} likes</div>
      </div>
    );
  }
}

export default EachFeed;
