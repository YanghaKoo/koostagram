import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import * as loginActions from 'store/modules/login'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'


class AppContainer extends Component {  
  componentDidMount() {
    const {LoginActions} = this.props
    LoginActions.login();
  }

  render() {
    const { user } = this.props
    return (      
        <App user={user} />              
    );
  }
}

export default withRouter(connect(
  state => ({
    user : state.login.user
  }),
  dispatch => ({
    LoginActions : bindActionCreators(loginActions,dispatch)
  })
)(AppContainer))