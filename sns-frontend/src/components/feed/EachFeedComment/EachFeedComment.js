import React, { Component } from "react";
import "./EachFeedComment.scss";
import axios from "axios";
import EachComment from "../../post/EachComment/EachComment";

class EachFeedComment extends Component {
  state = {
    content: "",
    commentsBefore: "loading..."
  };

  async componentDidMount() {
    if (this.state.commentsBefore === "loading..." && this.props.commentsCount !== 0) {
      const { data } = await axios.post("/post/getComments", {
        postid: this.props.id
      });
    
      let commentsBefore = data ? data.map(item => {
        return (
          <EachComment
            content={item.content}
            usernick={item.usernick}
            key={item.id}
            match={this.props.match}
          />
        );
      }) : "nocomment"

      this.setState({ commentsBefore });
    }

    
  }

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = async () => {
    const { handleCommentAction, id } = this.props;
    const { content } = this.state;

    let re = [];
    try {
      re = content.match(/#[^\s]*/g).filter(item => item.length >= 14);
    } catch (e) {}


    if (!localStorage.getItem("id")) {
      alert("먼저 로그인해 주세요.");
      return;
    }
    if (content.length >= 50) {
      alert("댓글은 50자 이내로 입력해 주세요.");
      return;
    }
    if (content.match(/#.*\S#/g)) {
      alert("해쉬태그는 연결해서 등록할수 없어요!");
      return;
    } else if (re[0]) {
      alert("14자가 넘는 해쉬태그가 존재합니다.");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }


    if (content.match(/#.*\S#/g)) {
      alert("해쉬태그는 연결해서 등록할수 없어요!");
      return;
    } else if (re[0]) {
      alert("14자가 넘는 해쉬태그가 존재합니다.");
      return;
    }

    const isSuccess = await axios.post("/post/uploadComment", {
      content: this.state.content,
      postid: id,
      usernick: localStorage.getItem("nick")
    });
    if (isSuccess.data === "success") handleCommentAction();
    else alert("잠시 후 다시 시도해주세요.");
  };

  handleEnter = e => {
    if (e.key === "Enter") this.handleSubmit();
  };

  render() {
    return (
      <div className="each-feed-comment">
        <div className="get-comment">{this.props.commentsCount === 0 ? ''  : this.state.commentsBefore}</div>
        <input
          placeholder="Add Comment"
          className="comment-content"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
        <input
          type="button"
          value="Submit"
          className="submit-button"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

export default EachFeedComment;
