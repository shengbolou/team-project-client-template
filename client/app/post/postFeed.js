import React from 'react';
import PostEntry from './postEntry';
import PostFeedItem from './postFeedItem';
import {getAllPosts,postStatus} from '../server';
import {hashHistory} from 'react-router';
import {socket,getToken} from '../credentials';
import {disabledElement} from '../util';

export default class PostFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      contents: [],
      notified:false,
      loadBtnText:"load more"
    }
  }


  getData(){
    getAllPosts((new Date()).getTime(), this.props.userId, (postFeedData)=>{
      this.setState({
        contents:postFeedData,
        notified:false
      });
    });
  }

  handleLoadMore(e){
    e.preventDefault();
    var date = this.state.contents.length===0?(new Date()).getTime():
    this.state.contents[this.state.contents.length-1].contents.postDate;
    getAllPosts(date, this.props.userId, (postFeedData)=>{
      if(postFeedData.length===0){
        return this.setState({
          loadBtnText:"nothing more to load"
        })
      }
      var newPostData = this.state.contents.concat(postFeedData);
      this.setState({
        contents:newPostData,
        notified:false
      });
    });
  }

  onPost(text,img){
    postStatus(this.props.userId, text, img,()=>{
      socket.emit('newPost',{authorization:getToken(),user:this.props.userId});
      this.getData();
    });
  }

  notifyMe(cb) {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      this.setState({
        notified:true
      });
      var notification = new Notification('WeMeet', {
        icon: 'http://localhost:3000/img/logo/mipmap-xxhdpi/ic_launcher.png',
        body: "Hey there! You have new posts"
      });
      notification.onclick = (event)=>{
        event.preventDefault();
        event.target.close();
        hashHistory.push("/post");
        cb();
      }
    }
  }

  componentWillReceiveProps(){
    this.getData();
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextState.contents===undefined || this.state.contents===undefined){
      return true;
    }
    else if(nextState.contents.length!==this.state.contents.length){
      return true;
    }
    return false;
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
        {this.state.contents.map((postFeedItem,i)=>{
          return <PostFeedItem key={i} data={postFeedItem} currentUser={this.props.user._id}/>
        })}
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button className={"btn btn-default loadbtn "+disabledElement(this.state.loadBtnText==="nothing more to load")} onClick={(e)=>this.handleLoadMore(e)}>
              {this.state.loadBtnText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.getData();
    socket.on('newPost',()=>{
      if(!this.state.notified){
        this.notifyMe(()=>{
          this.getData();
        });
      }
    });
  }
}
