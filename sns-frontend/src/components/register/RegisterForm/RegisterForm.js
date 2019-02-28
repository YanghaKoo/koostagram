import React, { useEffect, useState } from "react";
import "./RegisterForm.scss";
import axios from "axios";
import { debounce } from "lodash";

// rest url이랑, 검색어 돌릴 것
// TODO : 이 함수에 debounce를 적용하면 한타이밍 늦어지는 문제 해결하기
const debounceSearch = async (url, term) => {
  try {
    const { data } = await axios.post(url, { input: term });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

// input 조절하기
const useInput = (defaultValue, url) => {
  const [value, setValue] = useState(defaultValue);
  const [validity, setValidity] = useState(false); // 이메일이던, 닉네임이던, 비밀번호던 유효성

  const onChange = async e => {
    const {
      target: { value }
    } = e;
    setValue(value);

    // nickname의 경우 길이제한 + 중복검사
    if (url === "/auth/nickCheck") {
      const validity = await debounceSearch(url, value);
      console.log(validity);
      if (value.length <= 10 && value.length > 0 && validity === "ok") {
        setValidity(true);
      } else {
        setValidity(false);
      }

      // email의 경우 정규표현식으로 형식검사 + 중복검사
    } else if (url === "/auth/emailCheck") {
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (pattern.test(value)) {
        const validity = await debounceSearch(url, value);
        console.log(validity);
        validity === "ok" ? setValidity(true) : setValidity(false);
      } else setValidity(false);
    } else {
      // 비밀번호의 경우 8자 이상이면 유효성검사 통과
      value.length >= 8 ? setValidity(true) : setValidity(false);
    }
  };

  return { value, onChange, validity };
};

const RegisterForm = ({ history }) => {
  const email = useInput("", "/auth/emailCheck"); // email.value
  const nickname = useInput("", "/auth/nickCheck"); // nickname.value
  const pw = useInput(""); // password.value

  console.log(nickname.value, nickname.validity);
  return (
    <center>
      <div className="register-form">
        <label>Email 입력</label>
        <input
          className="input"
          id="1"
          {...email}
          placeholder="email을 입력해주세요."
          spellCheck={false}
        />
        {email.validity ? (
          <div style={{ color: "blue" }}>사용가능한 이메일입니다.</div>
        ) : (
          <div style={{ color: "red" }}>
            형식이 잘못되었거나 중복 이메일입니다.
          </div>
        )}
        <label>Nickname 입력</label>
        <input
          className="input"
          {...nickname}
          placeholder="닉네임을 입력해주세요."
          spellCheck={false}
        />
        {nickname.validity ? (
          <div style={{ color: "blue" }}>사용가능한 닉네임입니다.</div>
        ) : (
          <div style={{ color: "red" }}>사용이 불가능한 닉네임 입니다.</div>
        )}
        <label>Password 입력</label>
        <input
          className="input"
          type="password"
          {...pw}
          placeholder="비밀번호를 입력해주세요."
          spellCheck={false}
        />
        {pw.validity ? (
          <div style={{ color: "blue" }}>사용가능한 비밀번호입니다.</div>
        ) : (
          <div style={{ color: "red" }}>비밀번호가 너무 짧습니다.</div>
        )}

        <input
          type="button"
          className="submit-regi"
          value="Submit"
          onClick={async () => {
            if (email.validity && nickname.validity && pw.validity) {
              const register = await axios.post("/auth/join", {
                email: email.value,
                nick: nickname.value,
                password: pw.value
              });
              console.log(register.data);
              register.data === "success"
                ? history.push("/")
                : alert("가입을 환영합니다!");
              history.push("/");
            } else {
              alert("조건에 맞게 요소들을 작성해주세요!");
            }
          }}
        />
      </div>
    </center>
  );
};

export default RegisterForm;

// class RegisterForm extends Component {
//   state = {
//     email: "",
//     nick: "",
//     password: "",

//     e_placeholder: "Email을 입력해주세요",
//     n_placeholder: "nickname 입력 및 중복검사를 해주세요.",
//     p_placeholder: "8자이상의 비밀번호를 입력해주세요",

//     e_validity: 0,
//     n_validity: 0,
//     p_validity: 0,

//     isLoading : false

//   };

//   handleChange = e => {
//     if (e.target.name === "nick") {
//       this.setState({
//         [e.target.name]: e.target.value,
//         n_validity: 0,
//         n_placeholder: "nickname 중복 검사를 해주세요."
//       });
//     } else if (e.target.name === "email") {
//       this.setState({
//         [e.target.name]: e.target.value,
//         e_validity: 0,
//         e_placeholder: "email 검사를 해주세요."
//       });
//     } else {
//       this.setState(
//         {
//           [e.target.name]: e.target.value
//         },
//         () => {
//           if (this.state.password.length >= 8)
//             this.setState({
//               p_validity: 1,
//               p_placeholder: "사용 가능한 비밀번호 입니다."
//             });
//           else this.setState({
//             p_validity: 0,
//             p_placeholder : "비밀번호가 너무 짧습니다."
//           })
//         }
//       );
//     }
//   };

//   nickCheck = async () => {
//     if (this.state.nick.length <= 0) return;

//     const check = await axios.post("/auth/nickCheck", {
//       nick: this.state.nick
//     });
//     console.log(check.data);
//     // 중복 닉 없음
//     if (check.data === "ok" && this.state.nick.length > 0 && this.state.nick.length <= 10) {
//       this.setState({
//         n_validity: 1,
//         n_placeholder: "사용 가능한 닉네임입니다."
//       });
//     } else {
//       this.setState({
//         n_placeholder: "중복 닉네임 혹은 닉네임의 길이가 10자 이상입니다."
//       });
//     }
//   };

//   emailCheck = async () => {
//     const { email } = this.state;
//     const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

//     if (pattern.test(email)) {
//       const check = await axios.post("/auth/emailCheck", { email });
//       check.data === "ok"
//         ? this.setState({
//             e_validity: 1,
//             e_placeholder: "사용 가능한 email입니다."
//           })
//         : this.setState({ e_validity : 0, e_placeholder: "이미 가입된 email입니다." });
//     } else {
//       this.setState({
//         e_placeholder: "올바른 형식의 email이 아닙니다."
//       });
//     }
//   };

//   handleSubmit =async (e) => {
//     e.preventDefault()
//     this.setState({isLoading:true})
//     const {email, nick, password, e_validity, n_validity, p_validity} = this.state
//     if(e_validity && n_validity && p_validity)  {
//       const register = await axios.post("/auth/join", { email, nick, password})
//       register.data === "success" ? this.props.history.push('/') : alert("가입을 환영합니다!"); this.props.history.push('/')
//     }
//     else alert("조건에 맞게 요소들을 작성해주세요.")

//   }

//   render() {
//     const {
//       e_placeholder,
//       n_placeholder,
//       p_placeholder,
//       e_validity,
//       n_validity,
//       p_validity,
//       isLoading
//     } = this.state;

//     if (e_validity && n_validity && p_validity) {
//       document.getElementById("submit").disabled = false;
//       // this.setState({
//       //   style: { color: "red", background: "blue" }
//       // });
//     }
//     const spinnerSize =
//       window.innerWidth > 450
//         ? "100px"
//         : "50px";

//     if(isLoading) return <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="90vh" />;

//     return (

//       <form>
//         <center>
//           <div className="register-form">
//             <div className="checkSyntax" style={e_validity ? { color: "green" } : { color: "red" }}>
//               {e_placeholder}
//             </div>
//             <input
//               name="email"
//               placeholder="email"
//               className="input"
//               onChange={this.handleChange}
//               spellCheck={false}
//               value={this.state.email}
//             />
//             <input
//               className="checkButton"
//               type="button"
//               value="email 중복 검사"
//               onClick={this.emailCheck}
//             />

//             <div className="checkSyntax" style={n_validity ? { color: "green" } : { color: "red" }}>
//               {n_placeholder}
//             </div>
//             <input
//               name="nick"
//               spellCheck={false}
//               placeholder="nickname"
//               className="input"
//               onChange={this.handleChange}
//               value={this.state.nick}
//               id="nick-input"
//             />
//             <input
//               className="checkButton"
//               type="button"
//               value="nickname 중복 검사"
//               onClick={this.nickCheck}
//             />

//             <div className="checkSyntax" style={p_validity ? { color: "green" } : { color: "red" }}>
//               {p_placeholder}
//             </div>
//             <input
//               name="password"
//               type="password"
//               placeholder="password"
//               className="input"
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//             <input

//               type="submit"
//               value="Submit"
//               className="submit-regi"
//               id="submit"
//               onClick={this.handleSubmit}
//             />
//           </div>
//         </center>
//       </form>
//     );
//   }
// }

// export default RegisterForm;
