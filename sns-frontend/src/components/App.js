import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom'
import {MainPage, EachPostPage, UserPage, WritingPage, NotFound, RegisterPage, FeedPage, EditPage, HashTagSearch} from 'pages'
import Header from 'components/common/Header'
import HeaderContainer from '../containers/HeaderContainer/HeaderContainer';


class App extends Component {
  render() {
    const {user} = this.props

    return (
      <div>
        
        {user ? (<HeaderContainer isAble={true} to={`/user/${user.id}`} />) : (<HeaderContainer isAble={false} to="123"/>)}             
        <Switch>
          <Route exact path='/' component={MainPage} />          
          <Route path='/user/:userid/:postid' component={EachPostPage} />
          <Route path='/user/:userid' component={UserPage} />
          <Route path='/write' component={WritingPage} />          
          <Route path="/register" component={RegisterPage} />
          <Route path="/feed" component={FeedPage} />
          <Route path="/edit" component={EditPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App
