import React, { Component } from 'react';
import {connect} from 'react-redux'
import PostTemplate from '../../components/post/PostTemplate/PostTemplate';

class PostTemplateContainer extends Component {
  render() {
    
    return (
      <div>
        <PostTemplate user={this.props.user}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    user : state.login.user
  })
)(PostTemplateContainer)