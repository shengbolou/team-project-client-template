import React from 'react';
import ActivityFeedItem from './activityFeedItem';
import {getAllActivities} from '../server';
import {Link} from "react-router";
import {socket} from '../credentials';
import {hashHistory} from 'react-router';
var debug = require('react-debug');

export default class ActivityFeed extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      contents: [],
      notified:false
    }
  }

  getData(){
    getAllActivities(this.props.user, (activityFeedData)=>{
      this.setState({
        contents:activityFeedData,
        notified:false
      });
    });
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
        body: "Hey there! You have new activities"
      });
      notification.onclick = (event)=>{
        event.preventDefault();
        event.target.close();
        hashHistory.push('/activity');
        cb();
      }
    }
  }



  render(){
    if(this.state.contents.length === 0){
      return(
        <div className="alert alert-info" role="alert">
          No one has posted any activities yet.
          Post your first activity
          <Link to="postactivity"><strong> here</strong></Link>
        </div>
      );
    }
    return(
      <div>
        {this.state.contents.map((activityFeedItem)=>{
          return <ActivityFeedItem key={activityFeedItem._id} data={activityFeedItem} currentUser={this.props.user}/>
        })}
      </div>
    );
  }

  componentDidMount(){
    this.getData();
    socket.on('newActivity',()=>{
      if(!this.state.notified){
        this.notifyMe(()=>{
          this.getData();
        });
      }
    })
  }
}
