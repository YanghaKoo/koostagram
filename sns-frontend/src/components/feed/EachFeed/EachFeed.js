import React, { Component } from "react";
import "./EachFeed.scss";
import axios from "axios";

class EachFeed extends Component {
  state = {
    nick: ""
  };

  componentDidMount() {
    this.initializer();
  }

  componentDidUpdate(prevProps, prevState) {
    this.initializer()
  }
  

  initializer = async () => {
    const nick = await axios.post("/post/getNick", {
      userid: this.props.userid
    });
    //console.log(nick.data)
    this.setState({
      nick: nick.data
    });
  };

  handleClick =() => {
    const {history, id : postid, userid} = this.props
    history.push(`/user/${userid}/${postid}`)
  }

  render() {
    const { id, img, date } = this.props;
    const { nick } = this.state;
    const time = date.substr(11, 12).substr(0, 5);

    return (
      <div className="each-feed">
        <div className="top">
          <div className="left">
            <div className="profile-pic"></div>
            {nick}
          </div>
          <div className="right">
            {date.substr(0,10)} {time}
          </div>
        </div>
        <div className="img-area" onClick={this.handleClick}>
          <img src={img} />
        </div>
        <div className="comment-area">
          좋아요 & 댓글
        </div>        
      </div>
    );
  }
}

export default EachFeed;
