import React, { Component } from "react";
import "./Edit.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Edit extends Component {
  state = {
    selectedFile: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { user, history } = this.props;
    if (!user) {
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
    const { history, user } = this.props;
    const { selectedFile } = this.state;

    const fd = new FormData();
    console.log(selectedFile);
    fd.append("img", selectedFile, selectedFile.name); // 파일의 원본 파일이름 그대로
    fd.append("userid", user.id);

    const contentType = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const submit = await axios.post("/post/profile", fd, contentType);
    console.log(submit.data);
    history.push(`/user/${user.id}`);
  };

  render() {
    const {selectedFile} = this.state
    console.log(selectedFile)
    return (
      <div className="edit">
        <center>
          <div className="register-form">
            <label className="file-wrapper">{selectedFile ? "Selected!" : "Click Here to Select New Profile Picture!"}
              <input
                id="img"
                name="img"
                type="file"
                className="file-upload"
                onChange={this.handleFileChange}
              />
            </label>
            {selectedFile ? selectedFile.name : ''}
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
