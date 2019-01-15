import React, { Component } from "react";
import "./EachFeedComment.scss";
import axios from 'axios';

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
    const {handleCommentAction, user, id} = this.props    
    const isSuccess = await axios.post('/post/uploadComment', {content : this.state.content, postid : id, usernick : user.nick})
    if(isSuccess.data ==="success") handleCommentAction();
    else alert('잠시 후 다시 시도해주세요.')
  }

  handleEnter =(e) =>{
    if (e.key === "Enter") this.handleSubmit();
  }

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
        <input type="button" value="Submit" className="submit-button" onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export default EachFeedComment;