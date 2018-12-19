import React, { Component } from "react";
import "./Comment.scss";
import unlike from "images/unlike.png";
import like from "images/like.png";
import axios from 'axios'

// TODO : this.props.nick은 댓글 작성할 때 쓸 것
class Comment extends Component {  
  state = {
    like : unlike, 
    likeCount : 0,
    comment : '',
  }
  
  // likeUsers에 좋아요 누른 애들 정보 들어있음
  async componentDidMount() {
    const { postid } = this.props.match.params;
    const { user } = this.props    
    const likeUsers = await axios.post('/post/getLikeCount', {postid})    
    
    console.log(user)
    this.setState({
      likeCount : likeUsers.data.length
    })

    if(user){
      likeUsers.data.map( item => {
        if(item.id === user.id){
          this.setState({
            like : like
          })
        }
      })    
    }
 
    
  }
  

  // 좋아요 버튼이 눌릴 때 좋아요 및 좋아요 취소
  handleLikeClick = () =>{
    const { postid } = this.props.match.params;
    const { user } = this.props
    if(!user){
      alert("Login 후에 시도해 주세요.")
      return          
    }

    if(this.state.like === unlike){
      this.setState({
        like : like,
        likeCount : this.state.likeCount+1
      })
      axios.post("/post/like", {userid : user.id, postid})
    }    
    
    else{
      this.setState({
        like : unlike,
        likeCount : this.state.likeCount -1
      })
      axios.post("/post/unlike", {userid : user.id, postid})
    }
  }

  handleCommentChange = (e) =>{
    this.setState({
      comment : e.target.value
    })
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
          <input value={this.state.comment} onChange={this.handleCommentChange}/>
        </form>
      </div>
    );
  }
}

export default Comment;
