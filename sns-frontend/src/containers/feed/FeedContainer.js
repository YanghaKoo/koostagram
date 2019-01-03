import React, { Component } from "react";
import Feed from "components/feed/Feed";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class FeedContainer extends Component {

  render() {
    return (
      <div>
        <Feed
          user={this.props.user}
          history={this.props.history}
          location={this.props.location}
          ht = {this.props.ht}
        />
      </div>
    );
  }
}

export default connect(state => ({
  user: state.login.user
}))(withRouter(FeedContainer));
