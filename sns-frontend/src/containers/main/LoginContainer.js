import React, { Component } from 'react';
import * as loginActions from 'store/modules/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Login from 'components/main/Login'
import {withRouter} from 'react-router-dom'

class LoginContainer extends Component {
  
  
  constructor(props){
    super(props)
    const {LoginActions} = this.props
    LoginActions.login();
  }

  render() {
    const { user } = this.props
    if(user){
      // console.log(user.email)
      this.props.history.push(`/user/${user.id}`)
    }

    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default connect(
  state => ({
    user : state.login.user
  }),
  dispatch => ({
    LoginActions : bindActionCreators(loginActions,dispatch)
  })
)(withRouter(LoginContainer))