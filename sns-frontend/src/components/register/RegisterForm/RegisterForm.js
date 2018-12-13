import React, { Component } from "react";
import "./RegisterForm.css";

class RegisterForm extends Component {
  render() {
    return (
      <form action="/auth/join" method="post">
        <center>
        <div className="register-form">
          <input name="email" placeholder="email" className="input" />
          <input name="nick" placeholder="nick" className="input" />
          <input name="password" type="password" placeholder="password"className="input" />
          <input type="submit" value="Submit" className="submit"/>
        </div>
        </center>
      </form>
    );
  }
}

export default RegisterForm;
