import React, { Component } from "react";
import Profile from "../../components/user/Profile/Profile";
import * as loginActions from 'store/modules/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class ProfileContainer extends Component {
  render() {    
    console.log(this.props.user)
    return (
      <div>
        <Profile
          user={this.props.user}
          uid={this.props.uid}
          match={this.props.match}          
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.login.user
  }),
  dispatch => ({
    LoginActions : bindActionCreators(loginActions,dispatch)
  })
)(ProfileContainer);
