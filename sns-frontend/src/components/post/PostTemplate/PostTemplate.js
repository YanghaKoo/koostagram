import React, { Component } from "react";
import axios from "axios";
import "./PostTemplate.scss";
import { withRouter } from "react-router-dom";
import CommentContainer from "../../../containers/user/CommentContainer";
import Hashtag from "../Hashtag/Hashtag";
import Spinner from "../../../lib/Spinner";
import Mention from "../Mention/Mention";


class PostTemplate extends Component {
  state = {
    img: null,
    content: null,
    nick: null,
    createdAt : null
  };


  async componentDidMount() {
    this.initializer()
  }

  componentDidUpdate(prevProps, prevState) {
    if( (prevProps.token1 !== this.props.token1)  || (prevProps.token2 !== this.props.token2) ) this.initializer()
  }
  

  initializer = async () => {
    const { userid, postid } = this.props.match.params;

    // 게시글 가져오기 실패는 빈 배열이라도 리턴해 주니까 catch가 아닌 이런 방식으로 해야함
    const post = await axios.post("/post/getSinglePost", { postid });
    if (!post.data) {
      alert("해당 게시글이 존재하지 않습니다.");
      this.props.history.push("/");
      return;
    }

    // nick은 가져오기 실패시 catch로 디버깅
    const user = await axios.post("/post/getNick", { userid }).catch(e => {
      alert("해당 유저가 존재하지 않습니다.");
      this.props.history.push("/");
      return;
    });

    
    this.setState({
      img: post.data.img,
      content: post.data.content,
      nick: user.data,
      createdAt : post.data.createdAt
    });
  }

  handleDelete = async () => {
    const { postid, userid } = this.props.match.params;
    const { history } = this.props;

    if (window.confirm("삭제하시겠습니까?")) {
      await axios.post("/post/deletePost", { postid });      
      history.push(`/user/${userid}`);
    } else {
      return;
    }
  };



  
 
  render() {
    const { img, content, createdAt } = this.state;
    const { userid } = this.props.match.params;
    const { history } = this.props;

    // 본문의 hashtag부분을 해당 해쉬태그 검색과 연결시키는 부분, string형태의 본문을 재구성하여 해쉬태그부분을 차별화
    let contentWithHashtag;
    if (content) {
      contentWithHashtag = content.split(/\s+/);      // space or newline으로 나눠줌
      contentWithHashtag = contentWithHashtag.map((item) => {
        // console.log(item)
        if (item[0] === "#" && item.length > 1) {
          return (
            <div>
              <Hashtag hashtag={item} history={this.props.history} />              
            </div>
          );
        }else if (item[0] === "@" && item.length > 1) {
          return (
            <div>
              <Mention mention={item} history={this.props.history} match={this.props.match}/>              
            </div>
          );
        }
        return <div className="word">{item}</div>;
      });
    }

    if (!img) {
      return (
        <div className="loading">
          <Spinner width="100px" height="100px" pw="10%" ph="10vh"/>
        </div>
      );
    }

    return (
      <div className="post-template">
        <div className="pic">
          <img src={img} alt="" />
        </div>
        <div className="right">
          <div className="content">
            <div className="nick-with-delete-button">
              <b
                className="nick"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/user/${userid}`);
                }}
              >
                <div style={{ marginBottom: "20px" }}>@{this.state.nick}</div>
              </b>
              {(localStorage.getItem("id") ? Number(localStorage.getItem('id')) : null) === Number(userid) ? (
                <input
                  className="delete-button"
                  type="button"
                  value="Delete"
                  onClick={this.handleDelete}
                />
              ) : null}
            </div>
            <div className="test2">{contentWithHashtag}</div>
            <div>{this.hashtags}</div>
          </div>
          <CommentContainer previewCount={5} token1={this.props.token1} token2={this.props.token2} createdAt={createdAt}/>
        </div>
      </div>
    );
  }
}

export default withRouter(PostTemplate);
