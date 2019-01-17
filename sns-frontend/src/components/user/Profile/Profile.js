import React, { PureComponent } from "react";
import "./Profile.scss";
import axios from "axios";
import Modal from "../../common/Modal/Modal";
import Spinner from "../../../lib/Spinner";

class Profile extends PureComponent {
  state = {
    nick: "",
    buttonLabel: "follow",
    followers: [],
    following: [],
    profilePic: "",
    modal: false,
    select: 0,
    style: null,
    isLoading: false
  };

  componentDidMount() {
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
    this.setState({ isLoading: true }); // 읽어오기 시작!
    const { userid } = this.props.match.params;
    const { history, uid, user } = this.props;

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
    const profilePic = await axios.post("/post/getUserPic", { userid });

    this.setState({ isLoading: false }); // 읽어오기 완료!

    // 자기 프로필 일 때만 커서를 pointer로 해서 edit 하기 위함
    let style = null;
    if (user) {
      style = Number(uid) === user.id ? { cursor: "pointer" } : null;
    }
  
    this.setState({
      nick: nick.data,
      followers: followers.data.filter(item => item.id !== Number(userid)),
      following: following.data.filter(item => item.id !== Number(userid)),
      profilePic: profilePic.data,
      style: style
    });
    this.checkFollow();
  };

  checkFollow = () => {
    const { user } = this.props;
    const { followers } = this.state;

    if (user) {
      followers.map(item => {
        if (item.id === user.id) {
          this.setState({
            buttonLabel: "unfollow"
          });
        }
      });
    }
  };

  // follow(unfollow)버튼 클릭
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
  // Follower와 관련된 modal을 열어줌
  showFollowerModal = e => {
    this.setState({
      modal: true,
      select: 0
    });
  };

  // Following과 관련된 modal을 열어줌
  showFollowingModal = e => {
    this.setState({
      modal: true,
      select: 1
    });
  };

  // modal 열기/닫기
  handleModal = bool => {
    this.setState({
      modal: bool
    });
  };

  // 본인의 page일 때만 프로필사진 편집이 가능하게 구현, 남의 page에선 동작 X
  editProfile = () => {
    const { uid, user, history } = this.props;
    if (Number(uid) === user.id) {
      history.push("/edit");
    } else {
      return;
    }
  };

  render() {
    const { userid } = this.props.match.params;
    const { user } = this.props;
    const {
      followers,
      following,
      buttonLabel,
      nick,
      modal,
      select,
      profilePic,
      style,
      isLoading
    } = this.state;
    // console.log("Profile rendered");

    // 로딩 puff 보여주기
    if (isLoading) {
      let ph;
      window.innerWidth > 676 ? (ph = "240px") : (ph = "370px");
      const spinnerSize = window.innerWidth > 450 ? "100px" : "50px";
      return (
        <div className="profile">
          <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph={ph} />
        </div>
      );
    }

    let fontstyle
    if(nick.length >= 8){
      fontstyle = {fontSize : "1rem"}
    }
    

    return (
      <div className="profile">
        {select ? (
          <Modal
            open={modal}
            handleModal={this.handleModal}
            check="Following"
            list={following}
          />
        ) : (
          <Modal
            open={modal}
            handleModal={this.handleModal}
            check="Followers"
            list={followers}
          />
        )}
        <div className="profile-pic" onClick={this.editProfile} style={style}>
          <img src={profilePic? profilePic : "https://myspace.com/common/images/user.png"} alt=""/>          
        </div>
        <div className="user-detail">
          <div style={{ textAlign: "center" }}>
            <div>
              <div className="nick" style={fontstyle}>
                {nick ? "@" + nick : "loading..."}
              </div>{" "}
              <br />
              {!user || Number(userid) === user.id ? null : (
                <input
                  type="button"
                  value={buttonLabel}
                  onClick={this.handleFollow}
                  className="follow-button"
                />
              )}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="show-follow" onClick={this.showFollowerModal}>
              {followers.length} <br />
            </div>
            Followers
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="show-follow" onClick={this.showFollowingModal}>
              {following.length} <br />
            </div>
            Following
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
