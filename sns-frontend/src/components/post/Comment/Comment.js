import React, { Component } from "react";
import "./Comment.scss";
import unlike from "images/unlike.png";
import like from "images/like.png";
import axios from "axios";
import { withRouter } from "react-router-dom";

// TODO : this.props.nick은 댓글 작성할 때 쓸 것
class Comment extends Component {
  state = {
    like: unlike,
    likeCount: 0,
    comment: ""
  };

  // likeUsers에 좋아요 누른 애들 정보 들어있음
  async componentDidMount() {
    const { postid } = this.props.match.params;
    const { user } = this.props;
    const likeUsers = await axios.post("/post/getLikeCount", { postid });

    console.log(user);
    this.setState({
      likeCount: likeUsers.data.length
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
    const { postid } = this.props.match.params;
    const { comment} = this.state
    const {id} = this.props.user
    
    if(!comment) alert("내용을 입력해주세요.")
    await axios.post("/post/uploadComment", {postid, userid : id})


    
  };

  render() {
    const { previewCount } = this.props;
  
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
        <div>Comments Before</div>
        {previewCount >= 5 ? (
          <div>
            <input
              value={this.state.comment}
              onChange={this.handleCommentChange}
            />
            <input type="button" value="submit" onClick={this.handleSubmit}/>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Comment);
