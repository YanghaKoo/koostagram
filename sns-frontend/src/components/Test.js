import React, { Component } from "react";
import axios from 'axios'

class Test extends Component {

  state = {
    selectedFile : null
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const {selectedFile} = this.state
    
    const fd = new FormData();
    fd.append('img',selectedFile, selectedFile.name) // 파일의 원본 파일이름 그대로

    const contentType = {
      headers : { 'Content-Type': 'multipart/form-data'}
    }
    
    axios.post('/post/test', fd, contentType )
      .then(res=>console.log(res))
      .catch(e=>console.log(e))
  
  }

  handleChange = (e) => {
    this.setState({
      selectedFile : e.target.files[0]
    })
    console.log(e.target.files[0])
  }
  
  
  render() {


    return (
      <div>
        시발
        <form method="post" action="/post/test" encType="multipart/form-data">
          <input name="img" type="file" onChange={this.handleChange}/>
          <button type="submit" onClick={this.handleSubmit}>aa</button>
        </form>
      </div>
    );
  }
}

export default Test;
