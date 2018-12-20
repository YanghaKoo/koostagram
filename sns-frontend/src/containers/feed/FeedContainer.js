import React, { Component } from 'react';
import Feed from 'components/feed/Feed'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from "axios"

class FeedContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    const user = this.checkLogin()
    console.log(user)
    if(!user){
      alert("Please Login First")
      this.props.history.push("/")
    }

//    axios.post("/post/getFollowingPosts", {userid : user.id})


  }
  
  checkLogin = () => {
    const {user} = this.props    
    return user
  }
  render() {    
    return (
      <div>
        <Feed />
      </div>
    );
  }
}

export default connect(
  state => ({
    user : state.login.user
  })
)(withRouter(FeedContainer));