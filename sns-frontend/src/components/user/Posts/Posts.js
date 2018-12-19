import React, { Component } from "react";
import "./Posts.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

class Post extends Component {
  handleClick = (e) => {
    const {item, history} = this.props
    history.push(`/user/${item.userId}/${item.id}`)
  };

  render() {
    const {item} = this.props
    return (
      // <div className="post">
        <img
          src={item.img}
          style={{ width: "100%", height: "100%" }}
          alt=""
          onClick={this.handleClick}        
        />
      // </div>
    );
  }
}

class Posts extends Component {
  state = {
    posts: ["noPost"]
  };

  componentDidMount() {
    this.initializer()
  }

  initializer = () => {
    const { userid } = this.props.match.params;
    axios.post("/post/getPosts", { userid }).then(posts => {
      this.setState({
        posts: posts.data.reverse()
      })
      // console.log(this.state.posts);
    });
  } 

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.uid !== this.props.uid)  this.initializer();
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

    // TODO : delete index(key) when deploy(선택사항)
    const list = posts.map((item, index) => (
      <Post src={item.img} key={index} item={item} history={this.props.history} />
    ));
    //console.log(posts)
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
