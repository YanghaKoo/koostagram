import React, { Component } from "react";
import "./Header.scss";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    toggle: false
  };

  handleToggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  render() {
    const { isAble, to, input, handleChange, handleBlur } = this.props;
    

    return (
      <div className="wrapper">
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
            <Button isAble={isAble} to="/write">
              Write Post
            </Button>
            <Button isAble={isAble} to={to}>
              My Page
            </Button>
            {/* <div
              className="mobile-search-icon"
              onClick={this.handleToggle}
              style={{ cursor: "pointer" }}
            >
              <img
                src="https://png.pngtree.com/svg/20170313/search_white__122520.png"
                width={40}
                height={40}
                alt=""
              />
            </div> */}
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

export default Header;
