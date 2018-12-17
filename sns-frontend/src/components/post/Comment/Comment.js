import React, { Component } from "react";
import "./Comment.scss";
import unlike from "images/unlike.png";
import like from "images/like.png";
import axios from 'axios'

class Comment extends Component {
  
  state = {
    like : unlike,
    likeCount : 0
  }
  

  // 여기서부터 다시 봐야할듯.. 12/17
  handleLikeClick = () =>{
    const { userid, postid } = this.props.match.params;
    if(this.state.like === unlike){
      this.setState({
        like : like,
        likeCount : this.state.likeCount+1
      })
      axios.post("/post/like", {userid, postid})
    }    
    
    else{
      this.setState({
        like : unlike,
        likeCount : this.state.likeCount -1
      })
      axios.post("/post/unlike", {userid, postid})
    }
  }


  render() {
    return (
      <div className="comment">
        <div>          
          <img
            src= {this.state.like}
            width={30}
            height={30}
            alt=""
            onClick={this.handleLikeClick}
          />
          &nbsp;{this.state.likeCount} likes
        </div>
        <div>Comments Before</div>

        <form>
          <input />
        </form>
      </div>
    );
  }
}

export default Comment;
