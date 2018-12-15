import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom'
import {MainPage, EachPostPage, UserPage, WritingPage, NotFound, RegisterPage} from 'pages'
import Header from 'components/common/Header'


class App extends Component {
  render() {
    const {user} = this.props

    return (
      <div>
        {user ? (<Header isAble={true} to={`/user/${user.id}`} />) : (<Header isAble={false} to="123"/>)}             
        <Switch>
          <Route exact path='/' component={MainPage} />          
          <Route path='/post/:userid/:postId' component={EachPostPage} />
          <Route path='/write' component={WritingPage} />
          <Route path='/user/:userid' component={UserPage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App
