import React, { Component } from 'react';
import Comment from '../../components/post/Comment/Comment';
import { connect } from 'react-redux'


class CommentContainer extends Component {
  render() {
    const { match, id, nick } = this.props
    return (
      <div>
        <Comment match={match} id={id} nick={nick}/>
      </div>
    );
  }
}

export default connect(
  state=>({
    id : state.login.user.id,
    nick : state.login.user.nick
  })
)(CommentContainer)