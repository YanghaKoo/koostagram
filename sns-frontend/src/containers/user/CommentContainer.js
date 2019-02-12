import React, { Component } from "react";
import Comment from "../../components/post/Comment/Comment";
import { connect } from "react-redux";

class CommentContainer extends Component {
  render() {
    const { user, previewCount, createdAt } = this.props;
    // console.log(user);
    return (
      <div style={{ height: "36%" }}>
        <Comment  user={user} previewCount={previewCount} token1={this.props.token1} token2={this.props.token2} createdAt={createdAt}/>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.login.user
}))(CommentContainer);
