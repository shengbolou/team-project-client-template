import React from 'react';
import PostEntry from './postEntry';
import PostFeedItem from './postFeedItem';
import {getAllPosts,postNotification,postStatus,isPostNotificationRunning} from '../server';
import {hashHistory} from 'react-router';


export default class PostFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "contents": []
    }
  }


  getData(){
    getAllPosts(this.props.userId, (postFeedData)=>{
      this.setState({
        "contents":postFeedData
      });
    });
  }

  onPost(text,img){
    postStatus(this.props.userId, text, img,()=>{
      this.getData();
    });
  }

  getNotification(){
    if(!isPostNotificationRunning()){
      postNotification((x)=>{
        if(x.result > (this.state.contents.length===0?100000:this.state.contents.length)){
          this.notifyMe(()=>{
            this.getData();
          });
        }
      });
    }
  }

  // componentWillUnmount(){
  //   clearPostTimeInterval();
  // }

  notifyMe(cb) {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('WeMeet', {
        icon: 'http://localhost:3000/img/logo/mipmap-xxhdpi/ic_launcher.png',
        body: "Hey there! You have new posts"
      });
      notification.onclick = (event)=>{
        event.preventDefault();
        event.target.close();
        cb();
        hashHistory.push("/post");
      }
    }
  }


  render(){
    if(this.state.contents.length === 0){
      return(
        <div>
          <PostEntry userData={this.props.user} onPost={(text,img)=>this.onPost(text,img)}/>
          <div className="alert alert-info" role="alert">
            No one has posted anthing yet!
          </div>
        </div>
      );
    }
    return (
      <div>
        <PostEntry userData={this.props.user} onPost={(text,img)=>this.onPost(text,img)}/>
        {this.state.contents.map((postFeedItem)=>{
          return <PostFeedItem key={postFeedItem._id} data={postFeedItem} currentUser={this.props.user._id}/>
        })}
      </div>
    );
  }

  componentDidMount(){
    this.getData();
    this.getNotification();
  }
}
