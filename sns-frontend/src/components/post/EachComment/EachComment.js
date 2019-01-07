import React, { Component } from 'react';
import './EachComment.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class EachComment extends Component {

  state = {
    id : null
  }

  async componentDidMount() {
    const link = await axios.post('/post/getIdByNick', {nick : this.props.usernick})
    this.setState({
      id : link.data.id
    })
  }
  
  handleClick =() =>{
    const { history } = this.props
    const {id} = this.state
    id && history.push(`/user/${id}`)
  }

  render() {
    const {content, usernick } = this.props
    return (
      <div className="each-comment">
        <div onClick={this.handleClick} className="nick-area">{usernick} &nbsp; </div>
        <div className="contents"> {content}</div>
      </div>
    );
  }
}

export default withRouter(EachComment)