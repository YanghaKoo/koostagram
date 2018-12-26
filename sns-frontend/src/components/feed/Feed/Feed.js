import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";
import "./Feed.scss";

class RecommendUser extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const users = await axios.post("/post/getAlluser");
    this.setState({
      users: users.data
    });
  }

  shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {
    const { users } = this.state;
    let shuffled = this.shuffle(users);

    shuffled = shuffled.slice(0, 3);
    console.log(shuffled);

    const list = shuffled.map(user => {
      return <EachRecommend user={user} key={user.id} history={this.props.history}/>;
    });
    return (
      <center>
        <div> 끝! 여기다 팔로우할 계정 추천 </div>
        <div className="following-rec">{list}</div>
      </center>
    );
  }
}

const EachRecommend = ({ user, history }) => {
  return (
    <div
      className="each-rec"
      onClick={()=> {
        history.push(`/user/${user.id}`)
      }}
      >
      
      <div className="profile-pic" />
      <div className="nick">{user.nick}</div>
    </div>
  );
};









class Feed extends Component {
  state = {
    list: null,
    loadingState: false,
    noPost: null,
    tk: 0
  };

  // 인피니트 스크롤 관련 변수들
  items = [];
  it = 0;
  endOfList = false;

  componentDidMount() {
    setTimeout(() => {
      this.initializer();
    }, 100);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState !== this.state) return false;
  //   this.initializer();
  // }

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
      this.setState({
        noPost: 1
      });
      return;
    } else {
      this.it = listData.length;
      listData = listData.reverse();
      this.items = listData.splice(0, 3);

      // to rendering
      this.setState({
        tk: !this.state.tk
      });

      if (listData.length > 3) {
        this.infiniteScroll(listData);
      } else {
        this.endOfList = true;
        this.setState({
          tk: !this.state.tk
        });
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
    if (this.items.length >= this.it) {
      this.endOfList = true;
      this.setState({
        tk: !this.state.tk
      });
      return;
    }

    const { items } = this;
    const temp = listData.splice(0, 3); // listData는 앞에 3개를 줄였음

    this.setState({ loadingState: true });
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
      return (
        <div>
          <div>No Post! Follow Someone You Want</div>
          <RecommendUser history={this.props.history} />
        </div>
      );
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
          {this.endOfList ? <RecommendUser history={this.props.history} /> : ""}
        </div>
      </div>
    );
  }
}
//}

export default Feed;