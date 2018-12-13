import React from 'react';
import './Header.css'
import Button from 'components/common/Button'
import {Link} from 'react-router-dom'

const Header = ({isAble, to}) => {
  return (
    <div className="header">
      <Link className="logo" to="/">Koostagram</Link>
      <div className="right-part">
        <Button isAble={isAble} to='/write'>Write Post</Button>
        <Button isAble={isAble} to={to} >My Page</Button>        
      </div>
    </div>
  );
};

export default Header;