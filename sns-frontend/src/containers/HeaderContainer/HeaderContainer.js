import React, { Component } from "react";
import Header from "../../components/common/Header/Header";
import SearchList from "../../components/common/SearchList";
import { debounce } from "lodash";
import axios from "axios";

class HeaderContainer extends Component {
  state = {
    input: "",
    results : null,
  };

  handleChange = e => {
    this.setState(
      {input: e.target.value},
      () => {  if(this.state.input.length >= 2) this.searchUser(this.state.input);}
    );
  };

  handleBlur = () =>{
    setTimeout( () => {
      this.setState({
        input : ''
      })
    },150)
  }

  searchUser = debounce(async input => {
    const results = await axios.post("/post/search", { input: input });
    this.setState({
      results : results.data
    })
  }, 500);


  render() {
    const { isAble, to } = this.props;
    const { input } = this.state;

    return (
      <div>
        <Header
          isAble={isAble}
          to={to}
          input={input}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          id={Number(localStorage.getItem("id"))}
        />
        <SearchList data={this.state.results} input={input}/>
      </div>
    );
  }
}

export default HeaderContainer;
