import React, { Component, PureComponent } from "react";
import "./Profile.scss";
import axios from "axios";

class Profile extends PureComponent {
  state = {
    nick: "",
    buttonLabel: "follow",
    followers: [],
    following: [], 
    user : null   
  };
 
  async componentDidMount() {      
    this.initializer()
  }

  componentDidUpdate(prevProps, prevState) {    
    const {uid} = this.props    
    if(prevProps.uid !== uid)  this.initializer();        
  }

  initializer = async () => {
    const { userid } = this.props.match.params;
    const { history } = this.props;    

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
     
    this.checkFollow()
  }

  checkFollow = () => {
    const {user} = this.props
    if(user){      
      console.log(1)
      this.state.followers.map((item)=>{
        console.log('inside')
        if (item.id === user.id) {
          this.setState({
            buttonLabel: "unfollow"
          });
        }
      })
    }
  }



  handleFollow = e => {
    //팔로우 버튼 누르면
    const { userid } = this.props.match.params;
    const { user } = this.props;
    const { followers } = this.state

    if (this.state.buttonLabel === "follow") {
      axios.post("/post/follow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "unfollow",
        followers : followers.concat({ id : user.id, nick : user.nick })              
      });
    } else {
      axios.post("/post/unfollow", { followid: user.id, userid });
      this.setState({
        buttonLabel: "follow",
        followers : followers.filter(item => item.id !== user.id)              
      });
    }
  };
  
  render() {
    const { userid } = this.props.match.params;
    const { user } = this.props;
    // const { buttonLabel, followers } = this.state    

    console.log(this.state.followers)


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

export default Profile;
