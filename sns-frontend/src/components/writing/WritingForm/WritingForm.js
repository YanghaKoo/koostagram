import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'

class WritingForm extends Component {

  state = {
    selectedFile : null
  }


  handleSubmit = async data => {
    const { onSubmit, history, input } = this.props;
    const { selectedFile } = this.state
    // content가 비어있다면 경고창

    // if (!input) {
    //   alert("content를 입력해 주세요.");
    //   return;
    // }

    const fd = new FormData();
    console.log(selectedFile)
    fd.append('img',selectedFile, selectedFile.name) // 파일의 원본 파일이름 그대로 
    fd.append('text', input)

    const contentType = {
      headers : { 'Content-Type': 'multipart/form-data'}
    }
    
    await axios.post('/post', fd, contentType )
      .then(res=>console.log(res))
      .catch(e=>console.log(e))
    
    // 지금 postInfo랑 redux에서의 action.payload.data가 같은걸 가리키고 있음
    
    // const postInfo = await onSubmit(data);      // onSubmit(data,img)
    // console.log(postInfo.data)
    // history.push(`/post/${postInfo.data.userId}/${postInfo.data.id}`);
  };

  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  handleFileChange = e => {
    this.setState({
      selectedFile : e.target.files[0]
    })
    console.log(e.target.files[0])
  };

  render() {
    const { input } = this.props;

    return (
      //  <form method="post" action="/post/test"  encType="multipart/form-data">
      //   <input name="img" id="img" type="file" />
      //   <button type="submit">aa</button>
      // </form>
      <center>
        
        <div className="register-form">
          <input
            name="content"
            placeholder="content"
            className="input"
            value={input}
            onChange={this.handleChange}
          />
          <input
            id="img"
            name="img"
            type="file"
            className="input"
            onChange={this.handleFileChange}
          />
          <input
            type="button"
            value="Submit"
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



