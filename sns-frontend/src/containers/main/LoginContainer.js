import React, { Component } from 'react';
import * as loginActions from 'store/modules/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Login from 'components/main/Login'
import {withRouter} from 'react-router-dom'

class LoginContainer extends Component {
  
  constructor(props){
    super(props)        
    const { user } = this.props
    if(user){      
      // this.props.history.push(`/user/${user.id}`)    
      this.props.history.push('/feed')
      return  
    }    
  }  
  
  componentDidMount() {
    const {LoginActions} = this.props
    LoginActions.login();    
  }

  render() {
    return (
        <Login />
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