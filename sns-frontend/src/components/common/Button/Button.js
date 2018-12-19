import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Button = ({ children, isAble, to }) => {
  
  const Element = isAble && to ? Link : Div;

  let classes = "button";
  if (!isAble) {
    classes = "button disable";
  }

  return (
    <Element href ={to} to={to} className={classes}>
      {children}
    </Element>
  );
};

export default Button;
