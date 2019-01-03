import React, { Component } from 'react';


class Hashtag extends Component {
  render() {
    const { history, hashtag } = this.props;
    return (
      <div
        className="hashed"
        onClick={() => {
          history.push(`/feed?hashtag=${hashtag.slice(1)}`);
        }}
      >
        {hashtag}
      </div>
    );
  }
}

export default Hashtag;
