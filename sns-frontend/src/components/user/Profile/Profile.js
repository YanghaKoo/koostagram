import React, { Component } from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  state = {
    nick: "",
    buttonLabel: "follow",
    followers: [],
    following: []
  };

  // 왜 user가 not defined??????????????? 프론트의 세션에 받아놓을수 있는 방법이 있나???????
  async componentWillMount() {
    const { userid } = this.props.match.params;
    const { history, user } = this.props;

    const nick = await axios.post("/post/getNick", { userid }).catch(e => {
      alert("Wrong Request(해당 유저가 존재하지 않습니다.)");
      history.push("/");
    });

    const followers = await axios.post("/post/getFollowers", { userid });
    const following = await axios.post("/post/getFollowing", { userid });

    this.setState({
      nick: nick.data,
      followers: followers.data,
      following: following.data
    });

    followers.data.map(item => {
      if (user && item.id == user.id) {
        this.setState({
          buttonLabel: "unfollow"
        });
      }
    });
  
  }



  handleFollow = e => {
    //팔로우 버튼 누르면
    const { userid } = this.props.match.params;
    const { user } = this.props;

    if (this.state.buttonLabel === "follow") {
      axios.post("/post/follow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "unfollow"
      });
    } else {
      axios.post("/post/unfollow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "follow"
      });
    }
  };

  render() {
    const { userid } = this.props.match.params;
    const { user } = this.props;

    return (
      <div className="profile">
        <div className="profile-pic" />
        <div className="user-detail">
          <center>
            <div>
              {this.state.nick ? "@" + this.state.nick : "loading..."} <br />
              {!user || Number(userid) === user.id ? null : (
                <input
                  type="button"
                  value={this.state.buttonLabel}
                  onClick={this.handleFollow}
                />
              )}
            </div>
          </center>
          <center>
            <div>
              {this.state.followers.length} <br />
              Followers
            </div>
          </center>
          <center>
            <div>
              {this.state.following.length} <br />
              Following
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
