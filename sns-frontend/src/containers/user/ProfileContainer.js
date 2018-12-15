import React, { Component } from 'react';
import {connect} from 'react-redux'
import Profile from '../../components/user/Profile/Profile';

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