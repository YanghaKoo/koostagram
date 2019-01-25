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
    if(userid){

    
    setInterval(async () => {
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
    }, 10*1000);      // 1분
  }   
    this.initializer();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   try {
  //     if(prevProps.notifications[0].id === this.props.NotifyModal[0].id){
  //       this.initializer()
  //     }
  //   }catch(e){
      
  //   }
  // }
  

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




    // 그 이후에 setInterval로 일정 시간마다 받아오기, 
 
  };

  
  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle,
      hasNewNotification : false  
    });
  };

  handleLink = link => {
    if (localStorage.getItem("id")) this.props.history.push(link);
    else alert("로그인 후 가능합니다.");
  
  };

  handleToggleNotify = () => {
    if (!localStorage.getItem("id")) {
      alert("로그인 후 가능합니다.");
      return;
    }
    this.setState({
      toggle: !this.state.toggle,      
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
                src="https://trials.ai/wp-content/uploads/2018/09/user.png"
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
                src="https://www.materialui.co/materialIcons/action/alarm_white_192x192.png"
              />
              {hasNewNotification && <div className="dot" />}
            </div>

            {/*             
            <Button isAble={isAble} to="/write">
              Write Post
            </Button>
            <Button isAble={isAble} to={to}>
              My Page
            </Button> */}
          </div>
        </div>

        {/* {toggle ? 
        <div className="header">
              <input 
              style={{marginLeft : '5%'}}
              type="text"
              className="search"
              value={input}
              onChange={handleChange}
              spellCheck={false}
              placeholder="Search"
              onBlur={handleBlur}
            /> 
            </div>
            : 
        null} */}
      </div>
    );
  }
}

export default withRouter(Header);
