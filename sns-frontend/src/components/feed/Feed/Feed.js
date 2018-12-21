import React, { Component } from "react";
import axios from "axios";
import EachFeed from "../EachFeed/EachFeed";
import "./Feed.scss"
import ReactLoading from 'react-loading'

class Feed extends Component {
  state = {
    list: null,    
    loadingState : false,
    items : [],
  }; 
  
  start = 0
  end = 2;

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) return false;
    this.initializer();        
  }


  initializer = async () => {
    const { user, history } = this.props;   
    
    if(!user){
      alert('Please Login First')
      history.push('/')
      return
    }
    const followingList = await axios.post("/post/getFollowingPosts", {
      userid: user.id
    });
    const listData = followingList.data
    //console.log(listData);
    
    this.setState({
      list: listData.reverse(),
      items : [listData[0], listData[1], listData[2]]
    });    
    this.rend = [listData[0], listData[1], listData[2]]
    this.infiniteScroll(listData.reverse())    

  };

  infiniteScroll = (listData) => {   
    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight){
        this.loadMoreItems(listData);        
      }
    });
  }
  
  loadMoreItems(listData) {
    const { items } = this.state    
    let {start, end, rend} = this
    
    console.log("start  :", start)
    console.log("end : ", end)
    //console.log('도착')
    console.log(listData)    
    this.setState({ loadingState: true });      
    
    const temp = []
    for(let i = start; i <end; i++){
      console.log("iterator : ",i)
      temp.push(listData[i])
    }
    
    if(end < listData.length){
      this.start += 2
      this.end += 2
    }  
    console.log("sex", temp)

    setTimeout(() => {
      this.setState({ items : items.concat(temp), loadingState: false });
    }, 1000)    
  }
 

  render() {
    
    const { list, items, } = this.state;
    const { history } = this.props;
    console.log("render items  : " , items)

    if(!list){
      return <div className="loading"><ReactLoading type="bars" color="black" height={"20%"} width="20%" /></div>
    }else{


      const eachList = items.map(item => (
          <EachFeed
            id={item.id}
            img={item.img}
            nick={item.nick}
            history={history}
            key={item.id}
            date={item.createdAt}
            userid={item.userId}
            content={item.content}
          />
        ));
    
      return (
       <div className="feed">
        
        <div ref="iScroll" className="list">          
          <center>{eachList}</center>
          {this.state.loadingState ? <center><p> loading More Items..</p></center> : ""}
        </div>
      </div>);    
      }    
  }
}

export default Feed;
