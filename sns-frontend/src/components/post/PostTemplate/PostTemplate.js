import React, { Component } from "react";
import axios from "axios";
import "./PostTemplate.scss";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";
import Comment from "../Comment/Comment";
import CommentContainer from "../../../containers/user/CommentContainer";

class PostTemplate extends Component {
  state = {
    img: null,
    content: null,
    nick : null
  };

  async componentDidMount() {
    const { userid, postid } = this.props.match.params;
    const post = await axios.post("/post/getSinglePost", { postid });
    const user = await axios.post('/post/getNick', {userid})
    
    console.log(post.data);
    this.setState({
      img: post.data.img,
      content: post.data.content,
      nick : user.data
    });
  }

  render() {
    const { img, content } = this.state;
    if (!img) {
      return (
        <div className="loading">
          <ReactLoading type="bars" color="black" height={"20%"} width="20%" />
        </div>
      );
    }

    return (
      <div className="post-template">
        <div className="pic">
          <img src={img} />
        </div>
        <div className="right">
          <div className="content">
            <b>{this.state.nick}</b>
            <p>
            {content}test
            </p>
          </div> 
          {/* <Comment/>          */}
          <CommentContainer match={this.props.match}/>
        </div>
      </div>
    );
  }
}

export default withRouter(PostTemplate);
