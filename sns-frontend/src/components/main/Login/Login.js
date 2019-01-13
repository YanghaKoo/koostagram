import React, { Component } from "react";
import "./Login.scss";
import image from "images/mainpage.jpg";
import {Link} from 'react-router-dom'
import axios from "axios";

class Login extends Component {
  render() {    
    return (
      <div className="login">
        <div className="inner">
          <h2>Koostagram</h2>
          <form action="/auth/login" method="post">
            <p>
              <input placeholder="email" name="email" spellCheck={false} />
            </p>
            <p>
              <input placeholder="password" name="password" type="password" />
            </p>
            <center>
              <p>
                <input className="submit" type="submit" value="Login" />
              </p>
            </center>
            <div
              style={{
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "20px"
              }}
            >
              If you don't have account...
            </div>
            <p>
              <Link to="/register"><input className="submit" type="button" value="New Account" /></Link>
            </p>
            <center>
              <p>                                
                <input
                  className="fb submit"
                  type="submit"
                  // value="KaKao Login"
                  value ="Now Beta.."
                  style={{ background: "#fcd411" }}
                  
                  onClick={async () => {
                    // axios.post('/auth/kakao')
                    await axios.post('/post/sk') 
                    console.log(1)
                  }}
                />            
              </p>           
            </center>
          </form>
        </div>
        <div className="left-box">
          <img className="img" src="http://www.parisapartment7eme.com/eiffelcam/etandmoonb.jpg" alt=""/>
        </div>
      </div>
    );
  }
}

export default Login;
