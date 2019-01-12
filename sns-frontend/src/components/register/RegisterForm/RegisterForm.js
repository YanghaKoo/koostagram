import React, { Component } from "react";
import "./RegisterForm.scss";
import axios from "axios";

class RegisterForm extends Component {
  state = {
    email: "",
    nick: "",
    password: "",

    e_placeholder: "Email을 입력해주세요",
    n_placeholder: "nickname 입력 및 중복검사를 해주세요.",
    p_placeholder: "8자이상의 비밀번호를 입력해주세요",

    e_validity: 0,
    n_validity: 0,
    p_validity: 0,

  };

  componentDidMount() {
    //document.getElementById("submit").disabled = true;
  }

  // componentDidUpdate(prevProps, prevState) {
    
  //   const {e_validity, n_validity, p_validity} = this.state

  //   if (e_validity && n_validity && p_validity) {
  //     document.getElementById("submit").disabled = false;
  //     this.setState({
  //       style: { color: "red", background: "blue" }
  //     });
  //   }
    
  // }
  


  handleChange = e => {
    if (e.target.name === "nick") {
      this.setState({
        [e.target.name]: e.target.value,
        n_validity: 0,
        n_placeholder: "nickname 중복 검사를 해주세요."
      });
    } else if (e.target.name === "email") {
      this.setState({
        [e.target.name]: e.target.value,
        e_validity: 0,
        e_placeholder: "email 검사를 해주세요."
      });
    } else {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () => {
          if (this.state.password.length >= 8)
            this.setState({
              p_validity: 1,
              p_placeholder: "사용 가능한 비밀번호 입니다."
            });
          else this.setState({
            p_validity: 0,
            p_placeholder : "비밀번호가 너무 짧습니다."
          })
        }
      );
    }
  };

  nickCheck = async () => {
    if (this.state.nick.length <= 0) return;

    const check = await axios.post("/auth/nickCheck", {
      nick: this.state.nick
    });
    console.log(check.data);
    // 중복 닉 없음
    if (check.data === "ok" && this.state.nick.length > 0 && this.state.nick.length <= 10) {
      this.setState({
        n_validity: 1,
        n_placeholder: "사용 가능한 닉네임입니다."
      });
    } else {
      this.setState({
        n_placeholder: "중복 닉네임 혹은 닉네임의 길이가 10자 이상입니다."
      });
    }
  };

  emailCheck = async () => {
    const { email } = this.state;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (pattern.test(email)) {
      const check = await axios.post("/auth/emailCheck", { email });
      check.data === "ok"
        ? this.setState({
            e_validity: 1,
            e_placeholder: "사용 가능한 email입니다."
          })
        : this.setState({ e_validity : 0, e_placeholder: "이미 가입된 email입니다." });
    } else {
      this.setState({
        e_placeholder: "올바른 형식의 email이 아닙니다."
      });
    }
  };

  handleSubmit =async (e) => {
    e.preventDefault()
    const {email, nick, password, e_validity, n_validity, p_validity} = this.state
    if(e_validity && n_validity && p_validity)  {
      const register = await axios.post("/auth/join", { email, nick, password})
      register.data === "success" ? this.props.history.push('/') : alert("Something went wrong")
    } 
    
    else alert("조건에 맞게 요소들을 작성해주세요.")
    
  }

  render() {
    const {
      e_placeholder,
      n_placeholder,
      p_placeholder,
      e_validity,
      n_validity,
      p_validity,
    } = this.state;

    

    if (e_validity && n_validity && p_validity) {
      document.getElementById("submit").disabled = false;
      // this.setState({
      //   style: { color: "red", background: "blue" }
      // });
    }

    return (
      <form>
        <center>
          <div className="register-form">
            <div className="checkSyntax" style={e_validity ? { color: "green" } : { color: "red" }}>
              {e_placeholder}
            </div>
            <input
              name="email"
              placeholder="email"
              className="input"
              onChange={this.handleChange}
              spellCheck={false}
              value={this.state.email}
            />
            <input
              className="checkButton"
              type="button"
              value="email 중복 검사"
              onClick={this.emailCheck}
            />

            <div className="checkSyntax" style={n_validity ? { color: "green" } : { color: "red" }}>
              {n_placeholder}
            </div>
            <input
              name="nick"
              spellCheck={false}
              placeholder="nickname"
              className="input"
              onChange={this.handleChange}
              value={this.state.nick}
              id="nick-input"
            />
            <input
              className="checkButton"
              type="button"
              value="nickname 중복 검사"
              onClick={this.nickCheck}
            />

            <div className="checkSyntax" style={p_validity ? { color: "green" } : { color: "red" }}>
              {p_placeholder}
            </div>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
            
              type="submit"
              value="Submit"
              className="submit-regi"
              id="submit"
              onClick={this.handleSubmit}
            />
          </div>
        </center>
      </form>
    );
  }
}

export default RegisterForm;
