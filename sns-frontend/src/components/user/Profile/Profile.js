import React, { Component } from 'react';
import './Profile.scss'
import {withRouter} from 'react-router-dom'
import axios from 'axios';

class Profile extends Component {

  async componentDidMount() {
    // post로 userid에 맞는 자료들을 가져와서 뿌려주면 됨
    const { userid } = this.props.match.params
    const datas = await axios.post("/post/getPosts", {userid})
    // sequlize 공부한번 하고 가야겠다 여기서..

  }
  

  
  render() {
    
    const { userid } =this.props.match.params
    console.log(userid)

    return (
      <div className="profile">
        <div className="profile-pic"></div>
        <div className="user-detail">              
            흠...
        </div>                
        
      </div>
    );
  }
}

export default withRouter(Profile);