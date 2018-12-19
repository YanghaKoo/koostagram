import React, { Component } from "react";
import Comment from "../../components/post/Comment/Comment";
import { connect } from "react-redux";

class CommentContainer extends Component {
  render() {
    const { match, user } = this.props;
    console.log(user);
    return (
      <div style={{ height: "36%" }}>
        <Comment match={match} user={user} />
      </div>
    );
  }
}

export default connect(state => ({
  user: state.login.user
}))(CommentContainer);
