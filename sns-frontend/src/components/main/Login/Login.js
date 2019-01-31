import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Spinner from "lib/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    error: false
  };

  ref = null;
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  tryLogin = async () => {
    this.setState({ isLoading: true });

    const { email, password } = this.state;
    const result = await axios.post("/auth/login", { email, password });
    
    if (result.data === "failure") {
      // 시각적 효과를 위함
      setTimeout( () => {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          error: true
        });
        this.ref.focus();
      }, 200)            
    } else {            
      localStorage.setItem("id", result.data.id)
      localStorage.setItem("nick", result.data.nick)
      localStorage.setItem("pic", result.data.pic)

      this.setState({ isLoading: false });
      this.props.history.push("/feed");
    }
  };

  handleEnter = e => {
    if (e.key === "Enter") this.tryLogin();
  };

  render() {
    const spinnerSize = window.innerWidth > 450 ? "100px" : "50px";
    if (this.state.isLoading)
      return (
        <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="90vh" />
      );

    return (
      <div className="login">
        <div className="inner">
          <h2>Koostagram</h2>
          
          <div>
            <p>
              <input
                placeholder="email"
                name="email"
                spellCheck={false}
                className="input"
                value={this.state.email}
                onChange={this.handleChange}
                ref={ref => (this.ref = ref)}
              />
            </p>
            <p>
              <input
                placeholder="password"
                name="password"
                type="password"
                className="input"
                value={this.state.password}
                onChange={this.handleChange}
                onKeyPress={this.handleEnter}
              />
            </p>

            <p style={{textAlign:"center"}}>              
              <input
                className="submit"
                type="submit"
                value="Login"
                onClick={this.tryLogin}
              />
            </p>
            {this.state.error ? (
              <div className="error-message">
                id 혹은 비밀번호가 일치하지 않습니다.
              </div>
            ) : null}

            <div
              style={{
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "20px"
              }}
            >
              If you don't have account...
            </div>
            <p style={{textAlign:"center"}}>   
              <Link to="/register">
                <input className="submit" type="button" value="New Account" />
              </Link>
            </p>

            <p style={{textAlign:"center"}}>   
              <input
                className="submit"
                type="submit"
                // value="KaKao Login"
                value="Now Beta.."
                style={{ background: "#fcd411" }}
                disabled
                onClick={async () => {
                  axios.post("/auth/kakao");
                  // await axios.post('/post/sk')
                  // console.log(1)
                }}
              />
            </p>
          </div>
        </div>
        <div className="left-box">
          <img
            className="img"
            src="https://www.parisapartment7eme.com/eiffelcam/etandmoonb.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
