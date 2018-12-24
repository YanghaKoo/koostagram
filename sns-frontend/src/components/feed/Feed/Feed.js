import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";
import "./Feed.scss";

class Feed extends Component {
  state = {
    list: null,
    loadingState: false,
    items: [],
    noPost: null,
    tk: 0
  };

  items = [];
  it = 0;

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) return false;

    console.log(1);
    this.initializer();
  }

  initializer = async () => {
    const { user, history } = this.props;

    if (!user) {
      alert("Please Login First");
      history.push("/");
      return;
    }

    const followingList = await axios.post("/post/getFollowingPosts", {
      userid: user.id
    });

    let listData = followingList.data;

    if (listData === "no data") {
      console.log("1");
      this.setState({
        noPost: 1
      });
      return;
    } else {
      // console.log(listData); // 역순
      listData = listData.reverse();
      this.items = listData.splice(0, 3);

      // to rendering
      this.setState({
        tk: !this.state.tk
      });

      if (!this.items.length < 3 ) {
        this.infiniteScroll(listData);
      }
    }
  };

  infiniteScroll = listData => {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
        this.loadMoreItems(listData);
      }
    });
  };

  loadMoreItems(listData) {
    const { items } = this;
    this.setState({ loadingState: true });

    const temp = listData.splice(0, 3); // listData는 앞에 3개를 줄였음

    console.log("temp", temp); // 3,4,5
    console.log(this.items);
    this.items = items.concat(temp);
    
    setTimeout(() => {
      console.log(this.items);
      this.setState({ loadingState: false });
    }, 1000);
  }

  render() {
    const { items } = this;
    const { history } = this.props;
    console.log("render items  : ", items);

    if (this.state.noPost) {
      return <div>No Post! Follow Someone You Want</div>;
    }

    const eachList = items.map(item => (
      <EachFeed
        id={item.id}
        img={item.img}
        nick={item.nick}
        history={history}
        key={item.id}
        date={item.createdAt}
        userid={item.userId}
        content={item.content}
      />
    ));

    return (
      <div className="feed">
        <div ref="iScroll" className="list">
          <center>{eachList}</center>
          {this.state.loadingState ? (
            <center>
              <p> loading More Items..</p>
            </center>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
//}

export default Feed;
