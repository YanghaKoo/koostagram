import React, { Component } from "react";
import "./Header.scss";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { isAble, to, input, handleChange, handleBlur } = this.props;

    return (
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
        </div>
      </div>
    );
  }
}

export default Header

