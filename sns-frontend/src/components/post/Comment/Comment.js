import React, { Component } from "react";
import "./Comment.scss";
// import unlike from "images/unlike.png";
// import like from "images/like.png";
import axios from "axios";
import { withRouter } from "react-router-dom";
import EachComment from "../EachComment/EachComment";

const unlike = "https://cdn1.iconfinder.com/data/icons/valentine-s-day-simplicity/512/empty_heart-512.png"
const like = "https://cdn1.iconfinder.com/data/icons/love-icons/512/love-heart-512.png"

// TODO : this.props.nick은 댓글 작성할 때 쓸 것
class Comment extends Component {
  
  

  state = {
    like: unlike,
    likeCount: 0,
    comment: "",
    commentsBefore : null
  };

  // likeUsers에 좋아요 누른 애들 정보 들어있음
  componentDidMount() {
    this.initializer()
 }

 initializer = async () => {
  const { postid } = this.props.match.params;
  const { user } = this.props;
  
  const likeUsers = await axios.post("/post/getLikeCount", { postid });
  const commentsBefore = await axios.post("/post/getComments", { postid })

  this.setState({
    likeCount: likeUsers.data.length,
    commentsBefore : commentsBefore.data
  });    

  if (user) {
    likeUsers.data.map(item => {
      if (item.id === user.id) {
        this.setState({
          like: like
        });
      }
    });
  }
 }

 // 댓글 등록 후 실시간으로 업데이트 시키기, 댓글 등록후 스크롤 맨 아래로 내려서 본인이 등록한 댓글 확인
 updateComment = async () => {
  const { postid } = this.props.match.params;
  const commentsBefore = await axios.post("/post/getComments", { postid })
  this.setState({
    commentsBefore : commentsBefore.data
  },() => {document.getElementById('cl').scrollTop = document.getElementById('cl').scrollHeight});     
 }


  // 좋아요 버튼이 눌릴 때 좋아요 및 좋아요 취소
  handleLikeClick = () => {
    const { postid } = this.props.match.params;
    const { user } = this.props;
    if (!user) {
      alert("Login 후에 시도해 주세요.");
      return;
    }

    if (this.state.like === unlike) {
      this.setState({
        like: like,
        likeCount: this.state.likeCount + 1
      });
      axios.post("/post/like", { userid: user.id, postid });
    } else {
      this.setState({
        like: unlike,
        likeCount: this.state.likeCount - 1
      });
      axios.post("/post/unlike", { userid: user.id, postid });
    }
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleSubmit = async e => {
    //여기서부터 시작
    if(!this.props.user) {alert("먼저 로그인해 주세요."); return;}
    if(this.state.comment.length >= 50) {alert("댓글은 50자 이내로 입력해 주세요."); return}
    
    const { postid } = this.props.match.params;
    const { comment} = this.state
    const {nick} = this.props.user
  
    if(!comment) alert("내용을 입력해주세요.")
    await axios.post("/post/uploadComment", {content : comment, postid, usernick : nick})
    this.setState({
      comment : ''
    })    
    this.updateComment()    
  };

  handleKeyPress = (e) =>{
    if(e.key === 'Enter') this.handleSubmit()
  }

  render() {
    const { previewCount } = this.props;
    const {commentsBefore} = this.state
    let list = commentsBefore && commentsBefore.map(item => { return <EachComment content={item.content} usernick={item.usernick} key={item.id}/>})
    
    if(list !== null && list.length ===0) list = "첫 코멘트를 입력해주세요!"

  
    return (
      <div className="comment">
        <div>
          <img
            style={{ cursor: "pointer" }}
            src={this.state.like}
            width={30}
            height={30}
            alt=""
            onClick={this.handleLikeClick}
          />
          &nbsp;{this.state.likeCount} likes
        </div>
        <div className="comments-list" id="cl">{list}</div>        

        {  previewCount >= 5 ? (
          <div className="comment-write">
            <input
              value={this.state.comment}
              onChange={this.handleCommentChange}
              onKeyPress={this.handleKeyPress}
              className="comment-input"
              placeholder="Your Comment"
            />
            <input type="button" value="submit" onClick={this.handleSubmit} className="comment-submit"/>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Comment);
