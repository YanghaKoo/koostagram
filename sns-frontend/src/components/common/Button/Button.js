import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const Button = ({ children, onClick, isAble, to }) => {
  
  // 흠 link 말고 제출같은 버튼으로도 써야하는데
  const Element = isAble && to ? Link : Div;

  let classes = "button";
  if (!isAble) {
    classes = "button disable";
  }

  return (
    <Element to={to} className={classes}>
      {children}
    </Element>
  );
};

export default Button;
