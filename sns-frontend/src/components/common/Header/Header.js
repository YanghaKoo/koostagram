import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import {withRouter } from 'react-router-dom'
import NotifyModal from "../NotifyModal/NotifyModal";
// import Button from "components/common/Button";

class Header extends Component {
  state = {
    toggle: false
  };

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  handleLink = (link) => {
    if(localStorage.getItem("id")) this.props.history.push(link);
    else alert("로그인 후 가능합니다.")    
  }

  handleToggleNotify = () =>{
    if(!localStorage.getItem('id')) { alert("로그인 후 가능합니다."); return}
    this.setState({
      toggle : !this.state.toggle
    })
  }


  render() {
    const { isAble, input, handleChange, handleBlur } = this.props;
    const {toggle} = this.state
    
    // isAble로 클릭 가능한지 정하기
    let cursorStyle = isAble ? {cursor : "pointer"} : null
    
    return (
      <div className="wrapper">
        {toggle ? <NotifyModal handleToggle={this.handleToggle}/> : null}
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
            <div className="button-icon" style={cursorStyle} onClick={()=>{ this.handleLink("/write")}}>
              <img
                className="imgs"
                alt=""
                src="https://cdn3.iconfinder.com/data/icons/web-ui-3/128/Compose-2-512.png"
              />
            </div>

            {/* mypage */}
            <div className="button-icon" style={cursorStyle} onClick={()=>{ this.handleLink("/user/"+localStorage.getItem("id"))}}>
              <img
                className="imgs"
                alt=""
                src="https://trials.ai/wp-content/uploads/2018/09/user.png"
              />
            </div>
            {/* notify */}
            <div className="button-icon" style={cursorStyle} onClick={this.handleToggleNotify}>
              <img
                className="imgs"
                alt=""
                src="https://www.materialui.co/materialIcons/action/alarm_white_192x192.png"
              />
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

export default withRouter(Header)
