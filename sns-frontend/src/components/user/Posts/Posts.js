import React, { Component } from "react";
import "./Posts.css";

// 얘는 일단 사진을 받아와야해
// 해서 map함수로 사진 조그만한거 받아와서 렌더링 하는 식으로
// img주소가 든 배열을 가져와서(db에서 읽어내서) 그걸 map하는 식으로 img src에 배정해주면 될거같은데

const Post = ({ src }) => {
  return (
      <img src={src} style={{width : '100%', height : '100%'}}/>
  );
};


// sample엔 사진만 받아와서 해야겠네
// PostsContainer로 현재 rul에 있는 match.params의 조건으로 db를 돌려서 img 주소들을 받아와서 배열에 넣어라
// 일단 그럼 이미지파일 업로드부터 구현해야함

class Posts extends Component {
  render() {
    const sample = [
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200",
      "http://placehold.it/200"
    ];

    // 배포떄는 key 지워버리자
    const list = sample.map((item,index) => <Post src={item} key={index}/>);
    return <center><div className="posts">{list}</div></center>;
  }
}

export default Posts;
