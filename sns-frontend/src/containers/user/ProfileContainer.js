import React, { Component } from 'react';
import Profile from '../../components/user/Profile/Profile';
import {connect} from 'react-redux'

class ProfileContainer extends Component {
  render() {        
    return (
      <div>
        <Profile user={this.props.user}/>
      </div>
    );
  }
}

export default connect(
  state=>({
    user : state.login.user
  })
)(ProfileContainer);