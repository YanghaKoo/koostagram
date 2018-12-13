import React, { Component } from "react";
import Header from "components/common/Header";
import "./PostTemplate.css";

class PostTemplate extends Component {
  render() {
    return (
      <div className="post-template">
        <center>
        <div className="center">
          <div className="pic">사진</div>
          <div className="content">내용 영역</div>
          <div className="comment">댓글 영역</div>
        </div>
        </center>
      </div>
    );
  }
}

export default PostTemplate;
