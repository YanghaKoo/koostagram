import React, { Component } from "react";
import "./EachFeedComment.scss";
import axios from "axios";

class EachFeedComment extends Component {
  state = {
    content: ""
  };

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = async () => {
    const { handleCommentAction, id } = this.props;
    const { content } = this.state;

    let re =[]
    try{
      re  = content.match(/#[^\s]*/g).filter(item => item.length >= 14)
    }catch(e){}

    if(!content){
      alert("내용을 입력해주세요.")
      return 
    }

    if (content.match(/#.*\S#/g)) {
      alert("해쉬태그는 연결해서 등록할수 없어요!");
      return;
    }else if(re[0]){
      alert("14자가 넘는 해쉬태그가 존재합니다.")
      return
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
