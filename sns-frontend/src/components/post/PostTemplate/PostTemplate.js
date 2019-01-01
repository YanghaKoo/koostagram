import React, { Component } from "react";
import axios from "axios";
import "./PostTemplate.scss";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";
import CommentContainer from "../../../containers/user/CommentContainer";

class Hashtag extends Component {
  render() {
    const { history, hashtag } = this.props;
    return (
      <div 
        className="hashed"
        onClick={() => {
          history.push(`/feed?hashtag=${hashtag.slice(1)}`);
        }}
      >
        {hashtag}
      </div>
    );
  }
}

class PostTemplate extends Component {
  state = {
    img: null,
    content: null,
    nick: null
  };

  // hashtags = []

  async componentDidMount() {
    const { userid, postid } = this.props.match.params;

    // 게시글 가져오기 실패는 빈 배열이라도 리턴해 주니까 catch가 아닌 이런 방식으로 해야함
    const post = await axios.post("/post/getSinglePost", { postid });
    if (!post.data) {
      alert("Wrong Request(해당 게시글이 존재하지 않습니다.)");
      this.props.history.push("/");
      return;
    }

    // nick은 가져오기 실패시 catch로 디버깅
    const user = await axios.post("/post/getNick", { userid }).catch(e => {
      alert("Wrong Request(해당 유저가 존재하지 않습니다.)");
      this.props.history.push("/");
      return;
    });

    this.setState({
      img: post.data.img,
      content: post.data.content,
      nick: user.data
    });
  }

  render() {
    const { img, content } = this.state;
    const { userid, history } = this.props.match.params;

    let contentWithHashtag;
    if (content) {
      contentWithHashtag = content.split(" ");
      contentWithHashtag = contentWithHashtag.map(item => {
        if (item[0] === "#") {
          return (
            <div>
              <Hashtag hashtag={item} history={this.props.history} />
            </div>
          );
        }
        return <div className="word">{item}</div>;
      });
    }

    if (!img) {
      return (
        <div className="loading">
          <ReactLoading type="bars" color="black" height={"20%"} width="20%" />
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
            <b style={{cursor : "pointer"}} onClick={()=>{history.push(`/user/${userid}`)}}>@{this.state.nick}</b>
            <div className="test">
              {contentWithHashtag}
            </div>
            <div>{this.hashtags}</div>
          </div>
          <CommentContainer previewCount={5}/>
        </div>
      </div>
    );
  }
}

export default withRouter(PostTemplate);
