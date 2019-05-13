import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import NotifyModal from "../NotifyModal/NotifyModal";
import axios from "axios";

class Header extends Component {
  state = {
    toggle: false,
    notifications: "loading",
    hasNewNotification: false
  };

  async componentDidMount() {
    const userid = Number(localStorage.getItem("id"));
    if (userid) {
      this.getNotifications();
    }
    this.initializer();
  }

  // 비로그인 상태에서 로그인 했을때 알림 가져올 수 있게
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) this.getNotifications();
  }

  // 일정시간(10초)에 한번씩 새로운 알림이 있는지 확인하기 위한 함수
  getNotifications = () => {
    setInterval(async () => {
      const userid = Number(localStorage.getItem("id"));
      const myNotifications = await axios.post("/post/notification", {
        userid
      });
      for (const item of myNotifications.data) {
        if (!item.isChecked) {
          this.setState({ hasNewNotification: true });
          break;
        }
      }

      this.setState({
        notifications: myNotifications.data
      });
    }, 10 * 1000); // 10초
  };

  initializer = async () => {
    const userid = Number(localStorage.getItem("id"));
    const myNotifications = await axios.post("/post/notification", { userid });
    for (const item of myNotifications.data) {
      if (!item.isChecked) {
        this.setState({ hasNewNotification: true });
        break;
      }
    }

    this.setState({
      notifications: myNotifications.data
    });
  };

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
      hasNewNotification: false
    });
  };

  // 매개변수로 온 url로 이동시키기
  handleLink = link => {
    if (localStorage.getItem("id")) this.props.history.push(link);
    else alert("로그인 후 가능합니다.");
  };

  // 새로운 알림 확인/끄기
  handleToggleNotify = () => {
    if (!localStorage.getItem("id")) {
      alert("로그인 후 가능합니다.");
      return;
    }
    this.setState({
      toggle: !this.state.toggle
    });
  };

  render() {
    const { isAble, input, handleChange, handleBlur } = this.props;
    const { toggle, hasNewNotification } = this.state;

    // isAble로 클릭 가능한지 정하기
    let cursorStyle = isAble ? { cursor: "pointer" } : null;

    return (
      <div className="wrapper">
        {toggle ? (
          <NotifyModal
            handleToggle={this.handleToggle}
            notifications={this.state.notifications}
            initializer={this.initializer}
          />
        ) : null}
        <div className="header">
          <Link className="logo" to="/">
            Koostagram
          </Link>

          <div className="search-container">
            <input
              type="text"
              className="search"
              value={input}
              onChange={handleChange}
              spellCheck={false}
              placeholder="Search"
              onBlur={handleBlur}
            />
          </div>

          <div className="right-part">
            {/* write post */}
            <div
              className="button-icon"
              style={cursorStyle}
              onClick={() => {
                this.handleLink("/write");
              }}
            >
              <img
                className="imgs"
                alt=""
                src="https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Compose-2-512.png"
              />
            </div>

            {/* mypage */}
            <div
              className="button-icon"
              style={cursorStyle}
              onClick={() => {
                this.handleLink("/user/" + localStorage.getItem("id"));
              }}
            >
              <img
                className="imgs"
                alt=""
                src="https://image.flaticon.com/icons/svg/149/149071.svg"
              />
            </div>

            {/* notify */}
            <div
              className="button-icon cont"
              style={cursorStyle}
              onClick={this.handleToggleNotify}
            >
              <img
                className="imgs"
                alt=""
                src="https://image.flaticon.com/icons/svg/148/148921.svg"
              />
              {hasNewNotification && <div className="dot" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
