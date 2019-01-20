import React, { Component } from "react";
import "./Edit.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../lib/Spinner";

class Edit extends Component {
  state = {
    selectedFile: null,
    uploading: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { history } = this.props;
    if (!Number(localStorage.getItem('id'))) {
      alert("Please login first");
      history.push("/");
      return;
    }
  }

  handleFileChange = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
    console.log(e.target.files[0]);
  };

  handleSubmit = async () => {
    const { history } = this.props;
    const { selectedFile } = this.state;

    if (!selectedFile) {
      alert("프로필 사진을 선택해주세요.");
      return;
    }

    const fd = new FormData();
    console.log(selectedFile);
    fd.append("img", selectedFile, selectedFile.name); // 파일의 원본 파일이름 그대로
    fd.append("userid", Number(localStorage.getItem('id')));

    const contentType = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    this.setState({
      uploading: true
    });
    await axios.post("/post/profile", fd, contentType);
    history.push(`/user/${localStorage.getItem('id')}`);
  };

  render() {
    const { selectedFile } = this.state;

    const spinnerSize = window.innerWidth > 450 ? "100px" : "50px";
    if(this.state.uploading) return <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="90vh" />;
    
    return (
      <div className="edit">
        <center>
          <div className="writing-form">
            <label className="file-wrapper">
              {selectedFile ? "선택완료 :)" : "프로필 사진 선택하기"}
              <input
                id="img"
                name="img"
                type="file"
                className="file-upload"
                onChange={this.handleFileChange}
                accept=".gif, .jpg, .png"
              />
            </label>
            {selectedFile ? selectedFile.name : ""}
            <input
              type="button"
              value="Submit"
              className="submit"
              onClick={this.handleSubmit}
            />
          </div>
        </center>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.login.user
}))(withRouter(Edit));
