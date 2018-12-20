import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";
import "./Feed.scss"
import ReactLoading from 'react-loading'

class Feed extends Component {
  state = {
    list: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) return false;
    this.initializer();
  }

  initializer = async () => {
    const { user, history } = this.props;
    console.log(user);

    if(!user){
      alert('Please Login First')
      history.push('/')
      return
    }
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
            date={item.createdAt}
            userid={item.userId}
          />
        ));
      return (
      <div className="feed">
        <div className="list">
        {eachList}
        </div>
      </div>);
    }



    return <div className="loading"><ReactLoading type="bars" color="black" height={"20%"} width="20%" /></div>
  }
}

export default Feed;
