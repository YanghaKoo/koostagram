import React, { Component } from "react";
import "./EachComment.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Hashtag from "../Hashtag/Hashtag";
import Mention from "../Mention/Mention";

class EachComment extends Component {
  state = {
    id: null,
    tk: true
  };

  async componentDidMount() {
    const link = await axios.post("/post/getIdByNick", {
      nick: this.props.usernick
    });
    this.setState({
      id: link.data.id
    });
  }

  handleClick = () => {
    const { history } = this.props;
    const { id } = this.state;
    id && history.push(`/user/${id}`);
  };

  render() {
    const { content, usernick } = this.props;
    let withHT;
    if (content) {
      withHT = content.split(/\s+/); // space or newline으로 나눠줌
      withHT = withHT.map(item => {
        // console.log(item)
        if (item[0] === "#" && item.length > 1) {
          return (
            <div>
              <Hashtag hashtag={item} history={this.props.history} />
            </div>
          );
        } else if (item[0] === "@" && item.length > 1) {
          return (
            <div>
              <Mention mention={item} history={this.props.history} match={this.props.match}/>
            </div>
          );
        }

        return <div className="word">{item}</div>;
      });
    }

    return (
      <div className="each-comment">
        <div onClick={this.handleClick} className="nick-area">
          {usernick} &nbsp;{" "}
        </div>
        <div className="test2"> {withHT}</div>
      </div>
    );
  }
}

export default withRouter(EachComment);
