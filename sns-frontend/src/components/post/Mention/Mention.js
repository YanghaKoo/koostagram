import React, { Component } from "react";
import "./Mention.scss";
import axios from "axios";


class Mention extends Component {
  state = {
    isExist: true,
    id: null,
    
  };

  async componentDidMount() {
    const nick = this.props.mention.slice(1);
    const exist = await axios.post("/post/getIdByNick", { nick });
    if (exist.data.id) {      
      this.setState({        
        id: exist.data.id,        
      })
    }else{
      this.setState({
        isExist : false
      })
    }
  }

  handleClick = () => {
    const { history } = this.props;
    history.push(`/user/${this.state.id}`);
  };

  render() {
    const { mention } = this.props;
    const className = this.state.isExist ? "mention" : null;

      return (
        <div className={className} onClick={this.handleClick}>
          {mention}
        </div>
      );      
  }
}

export default Mention;
