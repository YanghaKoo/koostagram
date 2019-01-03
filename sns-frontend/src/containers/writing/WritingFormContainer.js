import React, { Component } from "react";
import * as postActions from "store/modules/post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WritingForm from "../../components/writing/WritingForm/WritingForm";
import {withRouter} from 'react-router-dom'

class WritingFormContainer extends Component {
  componentDidMount() {
    if(!this.props.user) { alert("Please login first."); this.props.history.push('/');}
  }
  
  render() {
    const { PostActions, input } = this.props;
    return (
      <div>
        <WritingForm
          input={input}          
          onSubmit={PostActions.submit}          
          onChange={(e)=>{PostActions.change(e)}}          
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    input: state.post.input,
    user : state.login.user
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(WritingFormContainer));
