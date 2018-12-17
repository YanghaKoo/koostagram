import React, { Component } from "react";
import "./Posts.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

// 얘는 일단 사진을 받아와야해
// 해서 map함수로 사진 조그만한거 받아와서 렌더링 하는 식으로
// img주소가 든 배열을 가져와서(db에서 읽어내서) 그걸 map하는 식으로 img src에 배정해주면 될거같은데

// const Post = ({ src }) => {
//   return (
//       <img src={src} style={{width : '100%', height : '100%'}} alt=""/>
//   );
// };

class Post extends Component {
  handleClick = (e) => {
    const {item, history} = this.props
    history.push(`/user/${item.userId}/${item.id}`)
  };

  render() {
    const {item} = this.props
    return (
      <img
        src={item.img}
        style={{ width: "100%", height: "100%" }}
        alt=""
        onClick={this.handleClick}
        
      />
    );
  }
}

// sample엔 사진만 받아와서 해야겠네
// PostsContainer로 현재 rul에 있는 match.params의 조건으로 db를 돌려서 img 주소들을 받아와서 배열에 넣어라
// 일단 그럼 이미지파일 업로드부터 구현해야함
class Posts extends Component {
  state = {
    posts: ["noPost"]
  };

  componentWillMount() {
    const { userid } = this.props.match.params;
    axios.post("/post/getPosts", { userid }).then(posts => {
      this.setState({
        posts: posts.data.reverse()
      });
      console.log(this.state.posts);
    });
  }

  render() {
    const { posts } = this.state;

    // loading , check no post
    if (posts[0] === "noPost") {
      return (
        <div className="loading">
          <ReactLoading type="bars" color="black" height={"20%"} width="20%" />
        </div>
      );
    } else if (posts.length === 0) {
      return <div>No post </div>;
    }

    // TODO : delete index(key) when deploy
    const list = posts.map((item, index) => (
      <Post src={item.img} key={index} item={item} history={this.props.history} />
    ));
    console.log(posts)
    return (
      <center>
        <div className="posts">{list}</div>
      </center>
    );
  }
}

export default withRouter(Posts);

// class Post extends Component {
//   render() {
//     return (
//       <div>
//         <img src={this.props.src} style={{width : '100%', height : '100%'}} alt=""/>
//       </div>
//     );
//   }
// }

// const sample = [
//   "http://placehold.it/201",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200",
//   "http://placehold.it/200"
// ];
