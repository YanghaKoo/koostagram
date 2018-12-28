import React, { Component } from "react";
import axios from "axios";
import "./PostTemplate.scss";
import { withRouter } from "react-router-dom";
import ReactLoading from "react-loading";
import CommentContainer from "../../../containers/user/CommentContainer";

// class Hash extends Component {
//   render() {
//     return (
//       <div className="hashd">
//         {this.props.hash}
//       </div>
//     );
//   }
// }

class PostTemplate extends Component {
  state = {
    img: null,
    content: null,
    nick: null
  };

  hashtags = []

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

  makeHashTag = content => {
    return content.replace(/#[^\s]*/g, hashtag => {
      return `<span class='hashed' onclick="">${hashtag}</span>`
    });
  };  
  
  render() {
    const { img, content } = this.state;
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
            <b>@{this.state.nick}</b>
            <div dangerouslySetInnerHTML={{ __html : this.makeHashTag(content)}}></div>            
          </div>
          <CommentContainer match={this.props.match} />
        </div>
      </div>
    );
  }
}

export default withRouter(PostTemplate);
