import React, { Component } from 'react';

class EachFeed extends Component {
  render() {
    const { nick, id, img}  = this.props
    return (
      <div>
        {nick} {id} {img}
      </div>
    );
  }
}

export default EachFeed;