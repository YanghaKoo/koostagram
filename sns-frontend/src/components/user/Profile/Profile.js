import React, { Component } from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  state = {
    nick: ""
  };
  // nickname, 정보를 db에서 읽어와서 표시
  constructor(props) {
    super(props);
    const { userid } = this.props.match.params;
    axios.post("/post/getNick", { userid }).then(nick => {      
      this.setState({
        nick: nick.data
      });
    });
  }

  render() {
    const { userid } = this.props.match.params;
    console.log(userid);
    
    return (
      <div className="profile">
        <div className="profile-pic" />
        <div className="user-detail">
          {this.state.nick ? "@" + this.state.nick +  "'s Koostagram" :  "loading..."}
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
