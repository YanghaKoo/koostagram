import React, { Component } from "react";
import "./Posts.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../lib/Spinner";

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

class Posts extends Component {
  state = {
    posts: ["noPost"],    
    isLoading : false
  };

  componentDidMount() {
    this.initializer()
  }

  initializer = () => {
    const { userid } = this.props.match.params;
    this.setState({isLoading : true})
    axios.post("/post/getPosts", { userid }).then(posts => {
      this.setState({
        posts: posts.data.reverse(),
        isLoading : false
      })
    });
  } 

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.uid !== this.props.uid)  this.initializer();
  }
  
  render() {
    const { posts, isLoading } = this.state;
    const spinnerSize = window.innerWidth > 450 ? "100px" : "50px";
    if(isLoading) {
      return <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="60vh"/>
    }
  

    // loading , check no post
    if (posts[0] === "noPost") {
      return null
    } else if (posts.length === 0) {
      return <div className="no-post">No post </div>;
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