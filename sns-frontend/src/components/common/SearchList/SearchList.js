import React, { Component } from "react";
import "./SearchList.scss";

class SearchList extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(this.props.data !== nextProps.data) return true
  //   else return false;
  // }
  

  render() {
    const { input, data } = this.props;
    
    if(input.length <=1) {
      return <div/>
    }
    

    if (data) { // 입력을 해서 데이터가 있을 때
      const {user, hashtag} = data
      if(user[0] && hashtag[0]){  // 유저와 해시태그 모두 검색됨
        console.log("User , Hashtag")
        return (
          <div className="search-list"> 
            <div className="list">User Hashtag</div>
          </div>
        )

      }else if(user[0] && !hashtag[0]){ // 유저만 검색됨
        console.log("User")
        return (
          <div className="search-list"> 
            <div className="list">User</div>
          </div>
        )

      }else if(!user[0] && hashtag[0]){ // 해시태그만 검색됨
        console.log("Hashtag")
        return (
          <div className="search-list"> 
            <div className="list">Hashtag</div>
          </div>
        )

      }else{  // 검색결과 없음
        console.log("no result")
        return (
          <div className="search-list"> 
            <div className="list">no result</div>
          </div>
        )
      }



    } else {
      return <div />;
    }
  }
}

export default SearchList;
