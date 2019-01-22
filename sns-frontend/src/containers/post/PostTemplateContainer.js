import React, { Component } from 'react';
import {connect} from 'react-redux'
import PostTemplate from '../../components/post/PostTemplate/PostTemplate';


class PostTemplateContainer extends Component {
  render() {
    const { userid, postid} = this.props.match.params

    return (
      <div>
        <PostTemplate user={this.props.user} token1={userid} token2={postid}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    user : state.login.user
  })
)(PostTemplateContainer)