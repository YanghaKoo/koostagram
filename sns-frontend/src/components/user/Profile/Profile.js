import React, { PureComponent } from "react";
import "./Profile.scss";
import axios from "axios";
import Modal from "../../common/Modal/Modal";

class Profile extends PureComponent {
  state = {
    nick: "",
    buttonLabel: "follow",
    followers: [],
    following: [],
    modal: false,
    select : 0
  };

  async componentDidMount() {
    this.initializer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid } = this.props;
    if (prevProps.uid !== uid) this.initializer();
  }

  renderModal = () => {
    return <Modal open={this.state.modal} />;
  };

  // 초기화 함수
  initializer = async () => {
    const { userid } = this.props.match.params;
    const { history } = this.props;

    // 버튼라벨 초기화
    if (this.state.buttonLabel === "unfollow") {
      this.setState({
        buttonLabel: "follow"
      });
    }

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
    this.checkFollow();
  };

  checkFollow = () => {
    const { user } = this.props;
    const { followers } = this.state;

    if (user) {
      followers.map(item => {
        console.log("inside");
        if (item.id === user.id) {
          console.log("inininininside");
          this.setState({
            buttonLabel: "unfollow"
          });
        }
      });
    }
  };

  handleFollow = e => {
    //팔로우 버튼 누르면
    const { userid } = this.props.match.params;
    const { user } = this.props;
    const { followers, buttonLabel } = this.state;

    if (buttonLabel === "follow") {
      axios.post("/post/follow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "unfollow",
        followers: followers.concat({ id: user.id, nick: user.nick })
      });
    } else {
      axios.post("/post/unfollow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "follow",
        followers: followers.filter(item => item.id !== user.id)
      });
    }
  };

  // select로 follower를 띄울 모달인지 following를 띄울 모달인지 구별해줌
  showFollowerModal = (e) => {
    this.setState({
      modal: true,      
      select : 0
    });
  };
  
  showFollowingModal = (e) => {
    this.setState({
      modal: true,    
      select : 1  
    });
  };

  handleModal = bool => {
    this.setState({
      modal: bool
    });
  };

  render() {
    const { userid } = this.props.match.params;
    const { user } = this.props;
    const { followers, following, buttonLabel, nick, modal, select } = this.state;

    console.log("Profile rendered")
    
    return (
      <div className="profile">
        {select ?  <Modal open={modal} handleModal={this.handleModal} check="Following" list={following}/> : <Modal open={modal} handleModal={this.handleModal} check="Followers" list={followers} />}
                    
        <div className="profile-pic" />
        <div className="user-detail">
          <center>
            <div>
              {nick ? "@" + nick : "loading..."} <br />
              {!user || Number(userid) === user.id ? null : (
                <input
                  type="button"
                  value={buttonLabel}
                  onClick={this.handleFollow}
                />
              )}
            </div>
          </center>
          <center>
            <div>
              <div className="show-follow" onClick={this.showFollowerModal}>
                {followers.length} <br />
              </div>
              Followers
            </div>
          </center>
          <center>
            <div>
              <div className="show-follow" onClick={this.showFollowingModal}>
                {following.length} <br />
              </div>
              Following
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default Profile;
