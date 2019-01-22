import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";
import {withRouter} from 'react-router-dom'

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

class Button extends React.Component {  
  handleClick= () => {
    localStorage.removeItem('user')
    this.props.history.push('/user/4')
  }
  
  render() {
  const { children, isAble, to, token } = this.props
  const Element = isAble && to ? Link : Div;

  let classes = "button";
  if (!isAble) {
    classes = "button disable";
  }

  if(token){
    return (
      <div className={classes} onClick={this.handleClick} style={{cursor : "pointer"}}>
        {children}      
      </div>
    ) 
  }

    
  return (
    <Element href ={to} to={to} className={classes}>
      {children}
    </Element>
  );
};
  
}

export default withRouter(Button)