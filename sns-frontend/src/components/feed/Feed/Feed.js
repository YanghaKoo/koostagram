import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";
import "./Feed.scss";
import qs from "query-string";

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

  // 친구추천을 위한 랜덤 3명 추천 logic
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
    // console.log(shuffled);

    const list = shuffled.map(user => {
      return (
        <EachRecommend
          user={user}
          key={user.id}
          history={this.props.history}
          pic={user.pic}
        />
      );
    });

    return (
      <div style={{ textAlign: "center" }} className="rec-user">
        <div
          style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "30px" }}
        >
          Feed에 더 이상 소식이 없습니다. 아래 계정들도 둘러보세요!
        </div>
        <div className="following-rec">{list}</div>
      </div>
    );
  }
}

const EachRecommend = ({ user, history, pic }) => {
  return (
    <div
      className="each-rec"
      onClick={() => {
        history.push(`/user/${user.id}`);
      }}
    >
      <div className="profile-pic">        
        {pic?  <img src={pic} width={100} height={100} alt="" />    : <div style={{marginTop : "38px"}}>no image</div>} 
      </div>
      <div className="nick">{user.nick}</div>
    </div>
  );
};

class Feed extends Component {
  state = {
    list: null,
    loadingState: false,
    noPost: null,
    tk: 0,
    wrongAccess: null,
    isLoading : false
  };

  // 인피니트 스크롤 관련 변수들
  items = [];
  it = 0;
  endOfList = false;

  componentDidMount() {
    // console.log("Component did mount");
    setTimeout(() => {
      this.initializer();
    }, 100);
  }

  // feed에서 query가 바뀔때 바로 적용하기 위해서
  componentDidUpdate(prevProps, prevState) {
    // console.log("Component did UPDATA!!!!");
   

    const { user, ht } = this.props;
    if ( (prevProps.user !== user) || (prevProps.ht !== ht)) {
      this.initializer();
      try {
        document.getElementById("list").scrollTo(0, 0);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    
  }

  initializer = async () => {
    
    const { location, user, } = this.props;
    const query = qs.parse(location.search);

    // 로그인 안해도 해쉬태그 검색은 볼 수 있음
    if (!user && !query.hashtag) {
      return;
    }    
    
    const followingList = query.hashtag
      ? await axios.post("/post/getHashTagPost", { tag: query.hashtag })
      : await axios.post("/post/getFollowingPosts", { userid: user.id });

    let listData = followingList.data;
    

    if (listData === "no data") {
      this.setState({
        noPost: 1
      });
      return;
      
    } else {
      this.it = listData.length;
      listData = listData.reverse();
      this.items = listData.slice(0, 3);

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
      this.setState({ loadingState: false });
    }, 1000);
  }

  render() {
    const { items } = this;
    const { history, location } = this.props;
    const query = qs.parse(location.search);

    // console.log("render items  : ", items);

    if (this.state.noPost) {
      return (
        <div style={{ marginTop: "100px" }}>
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
        loggedInUser ={this.props.user}
      />
    ));

    return (
      <div className="feed">
        <div ref="iScroll" className="list" id="list">
          
          {/* 해쉬태그 검색일 경우 검색 해쉬태그 내용 표시 */}
          {query.hashtag ? (
            <center>
              <div className="searched-hashtag">
                Searched Hashtag : <span className="ht">#{query.hashtag}</span>
              </div>
            </center>
          ) : null}

          {/* 실제 리스트 */}
          <center>{eachList}</center>
          {this.endOfList ? <RecommendUser history={this.props.history} /> : ""}
        </div>
      </div>
    );
  }
}
//}

export default Feed;
