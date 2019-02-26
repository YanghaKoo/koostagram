import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./WritingForm.scss";
import Spinner from "../../../lib/Spinner";

class WritingForm extends Component {
  state = {
    selectedFile: null,
    uploading: false,
    imagePreviewUrl: null
  };

  // 제출 버튼을 누를 때, 여러가지 조건들이 만족 안되면 서버쪽으로 제출이 되지 않게 방어코드를 짜 둠.
  handleSubmit = async data => {
    const { history, input, onChange } = this.props;
    const { selectedFile } = this.state;

    // 정규표현식 사용
    let re = input.match(/#[^\s]*/g);
    let isLinkedTagExist = input.match(/#.*\S#/g);

    /*
      여러가지 방어코드의 경우
        1) 파일이 선택되지 않았을 때
        2) 본문 내용이 140자 이상
        3) 해쉬태그의 길이가 12 이상 
     */
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

    // 해쉬태그가 붙어있는 경우 ex) #일상#ootd
    if (isLinkedTagExist) {
      alert("해쉬태그 간에는 공백을 넣어주세요.(space)");
      return;
    }

    // 확장자 검사, jpg, jpeg, png, gif만 올릴 수 있음
    const exName = selectedFile.name.split(".")[selectedFile.name.split(".").length-1].toLowerCase()
    if( !(exName === "jpg" || exName === "jpeg" || exName ==="png" || exName === "gif")){
      alert("파일의 형식이 잘못되었습니다. jpg, png, gif파일만 업로드 가능합니다.")
      return
    }

    const fd = new FormData();
    fd.append("img", selectedFile, selectedFile.name); // 파일의 원본 파일이름 그대로 유지
    fd.append("text", input);
    fd.append("id", Number(localStorage.getItem("id")));

    const contentType = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    this.setState({ uploading: true });
    const submit = await axios.post("/post", fd, contentType);

    // 제출 성공 여부 확인
    if (submit.data === "failure") {
      this.setState({ uploading: false });
      alert("업로드에 실패하였습니다. 관리자에게 연락주세요.");
      history.push("/write");
    } else {
      onChange("");
      history.push(`/user/${submit.data.userId}/${submit.data.id}`);
    }
  };

  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  // file 선택이 바뀔 때 파일 미리보기를 제공하기 위해 만든 함수
  handleFileChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    };
    try {
      reader.readAsDataURL(file);
    } catch (error) {}
  };

  render() {
    const { input } = this.props;
    const { imagePreviewUrl } = this.state;

    // 글자수 제한 넘으면 붉은색으로 표시
    const style = input.length < 140 ? null : { color: "red" };
    const placeholder =
      window.innerWidth > 450
        ? "오늘의 하루는 어떠셨나요? :)"
        : "오늘의 하루는\n어떠셨나요? :)";

    const imagePreview = imagePreviewUrl ? (
      <img src={imagePreviewUrl} alt="" />
    ) : (
      null
    );

    const spinnerSize = window.innerWidth > 450 ? "100px" : "50px";
    const imageButtonLabel = this.state.selectedFile
      ? "다시고르기"
      : "업로드할 사진 고르기";

    // 업로드 버튼 눌러서 업로딩으로 들어가면 스피너 띄우게
    if (this.state.uploading)
      return (
        <Spinner width={spinnerSize} height={spinnerSize} pw="100%" ph="90vh" />
      );

    return (
      <center>
        <div className="writing-form">
          <div className="title">Post Your Content!</div>
          <div className="preview">{imagePreview}</div>
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
