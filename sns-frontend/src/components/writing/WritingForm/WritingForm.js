import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./WritingForm.scss";


class WritingForm extends Component {
  state = {
    selectedFile: null
  };

  handleSubmit = async data => {
    const { history, input, onChange } = this.props;
    const { selectedFile } = this.state;

    let re = input.match(/#[^\s]*/g);
    console.log(re);

    // 사진을 업로드하지 않은 경우
    if (!selectedFile) {
      alert("사진은 필수로 첨부해주세요.");
      return;
    } else if (input.length >= 140) {
      alert("본문 내용은 140자 이내로 해주세요.");
      return;
    } else if (re) {
      re = re.filter(item => item.length >= 14);
      if (re[0]) {
        alert("12자가 넘는 해쉬태그가 존재합니다.");
        return;
      }
    }

    const fd = new FormData();
    console.log(selectedFile);
    fd.append("img", selectedFile, selectedFile.name); // 파일의 원본 파일이름 그대로
    fd.append("text", input);

    const contentType = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    const submit = await axios.post("/post", fd, contentType);
    console.log(submit.data);
    onChange("");
    history.push(`/user/${submit.data.userId}/${submit.data.id}`);
  };

  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  handleFileChange = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
    console.log(e.target.files[0]);
  };

  render() {
    const { input } = this.props;
    const style = input.length < 140 ? null : { color: "red" };
    const placeholder =
      window.innerWidth > 450
        ? "오늘의 하루는 어떠셨나요? :)"
        : "오늘의 하루는\n어떠셨나요? :)";

    const imageButtonLabel = this.state.selectedFile
      ? "Selected!"
      : "Click to Select Image";

    return (
      <center>
        <div className="register-form">
          <div className="title">Post Your Contents</div>
          <label className="file-wrapper">
            {imageButtonLabel}
            <input
              id="img"
              name="img"
              type="file"
              className="file-upload"
              onChange={this.handleFileChange}
              accept=".gif, .jpg, .png"
            />
          </label>
          <textarea
            spellCheck={false}
            name="content"
            placeholder={placeholder}
            className="text"
            value={input}
            onChange={this.handleChange}
          />
          <div className="word-count" style={style}>
            {input.length < 140 ? input.length + " / 140" : "글자수 초과"}
          </div>

          <input
            type="button"
            value="Submit!"
            className="submit"
            onClick={() => {
              this.handleSubmit(input);
            }}
          />
        </div>        
        
      </center>
    );
  }
}

export default withRouter(WritingForm);
