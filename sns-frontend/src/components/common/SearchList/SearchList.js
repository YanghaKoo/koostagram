import React, { Component } from "react";
import "./SearchList.scss";
import { withRouter } from "react-router-dom";

class UserResult extends Component {
  handleClick = () => {
    // console.log("User Clicked");
    const { history, user } = this.props;
    history.push(`/user/${user.id}`);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="user-result" onClick={this.handleClick}>
        {user.nick}
      </div>
    );
  }
}

class HashTagResult extends Component {
  handleClick = () => {
    console.log("hashtag Clicked");
    const { history, hashtag } = this.props;
    history.push(`/feed?hashtag=${hashtag.title}`);
  };

  render() {
    const { hashtag } = this.props;
    return (
      <div className="ht-result" onClick={this.handleClick}>
        #{hashtag.title}
      </div>
    );
  }
}

class SearchList extends Component {
  // token이 "user"이면 user 3개를, "user"가 아니면 user의 3래의 결과를 리턴해줌
  // count에 따라 둘다 갯수만큼 리턴해줌(hashtag만 검색되거나 user만 검색된 경우에 6개를 받고, 둘다 검색된 경우에 3개씩 받기 위함)
  mapItems = (arr, token, count) => {
    return token === "user"
      ? arr
          .slice(0, count)
          .map(user => (
            <UserResult
              user={user}
              history={this.props.history}
              key={user.id}
            />
          ))
      : arr
          .slice(0, 3)
          .map(hashtag => (
            <HashTagResult
              hashtag={hashtag}
              history={this.props.history}
              key={hashtag.id}
            />
          ));
  };

  render() {
    const { input, data } = this.props;
    const { mapItems } = this;

    if (input.length <= 1) {
      return <div />;
    }

    if (data) {
      // 입력을 해서 데이터가 있을 때
      const { user, hashtag } = data;
      // console.log(user, hashtag);
      if (user[0] && hashtag[0]) {
        // 유저와 해시태그 모두 검색됨
        return (
          <div className="search-list">
            <div className="list">
              <div className="user-list">{mapItems(user, "user", 3)}</div>
              <div className="hash-list">{mapItems(hashtag, "hash", 3)}</div>
            </div>
          </div>
        );
      } else if (user[0] && !hashtag[0]) {
        // 유저만 검색됨
        return (
          <div className="search-list">
            <div className="list">
              <div className="user-list" style={{ height: "200px" }}>
                {mapItems(user, "user", 6)}
              </div>
            </div>
          </div>
        );
      } else if (!user[0] && hashtag[0]) {
        // 해시태그만 검색됨
        return (
          <div className="search-list">
            <div className="list">
              <div className="hash-list" style={{ height: "200px" }}>
                {mapItems(hashtag, "hash", 6)}
              </div>
            </div>
          </div>
        );
      } else {
        // 검색결과 없음

        return (
          <div className="search-list">
            <div className="list">
              <div className="noresult">No Result</div>
            </div>
          </div>
        );
      }
    } else {
      return <div />;
    }
  }
}

export default withRouter(SearchList);
