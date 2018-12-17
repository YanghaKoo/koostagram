import React, { Component } from "react";
import "./Comment.scss";
import unlike from "images/unlike.png";
import like from "images/like.png";
import axios from 'axios'


// TODO : this.props.nick은 댓글 작성할 때 쓸 것
class Comment extends Component {
  
  state = {
    like : unlike, 
    likeCount : 0
  }


  // likeUsers에 좋아요 누른 애들 정보 들어있음
  async componentWillMount() {
    const { postid } = this.props.match.params;
    const { id } = this.props
    const likeUsers = await axios.post('/post/getLikeCount', {postid})
    console.log(likeUsers)
    
    this.setState({
      likeCount : likeUsers.data.length
    })

    likeUsers.data.map( item => {
      if(item.id === id){
        this.setState({
          like : like
        })
      }
    })    
  }
  

  // 좋아요 버튼이 눌릴 때 좋아요 및 좋아요 취소
  handleLikeClick = () =>{
    const { postid } = this.props.match.params;
    const { id } = this.props
    if(!id){
      alert("Login 후에 시도해 주세요.")
      return          
    }

    if(this.state.like === unlike){
      this.setState({
        like : like,
        likeCount : this.state.likeCount+1
      })
      axios.post("/post/like", {userid : id, postid})
    }    
    
    else{
      this.setState({
        like : unlike,
        likeCount : this.state.likeCount -1
      })
      axios.post("/post/unlike", {userid : id, postid})
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
