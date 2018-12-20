import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";

class Feed extends Component {
  state = {
    list: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) return false;
    this.initializer();
  }

  initializer = async () => {
    const { user } = this.props;
    console.log(user);
    const followingList = await axios.post("/post/getFollowingPosts", {
      userid: user.id
    });

    console.log(followingList.data);
    this.setState({
      list: followingList.data
    });
  };

  render() {
    const { list } = this.state;
    const { history } = this.props;
    if (list) {
      const eachList = list
        .reverse()
        .map(item => (
          <EachFeed
            id={item.id}
            img={item.img}
            nick={item.nick}
            history={history}
            key={item.id}
          />
        ));
      return <div>{eachList}</div>;
    }



    return <div>loading...</div>;
  }
}

export default Feed;
