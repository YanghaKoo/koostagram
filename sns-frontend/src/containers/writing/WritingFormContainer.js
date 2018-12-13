import React, { Component } from "react";
import * as postActions from "store/modules/post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WritingForm from "../../components/writing/WritingForm/WritingForm";

class WritingFormContainer extends Component {
  render() {
    const { PostActions, input } = this.props;
    return (
      <div>
        <WritingForm
          input={input}          
          onSubmit={PostActions.submit}
          // loading ={loading}
          // failure ={failure}
          onChange={(e)=>{PostActions.change(e)}}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    input: state.post.input,
    // loading : state.pender.pending['SUBMIT'],
    // failure : state.pender.failure['SUBMIT']
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(WritingFormContainer);
