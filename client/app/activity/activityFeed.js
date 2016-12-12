import React from 'react';
import ActivityFeedItem from './activityFeedItem';
import {getActivityFeedData} from '../server';
import {Link} from "react-router";

export default class ActivityFeed extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      contents: []
    }
  }

  getData(){
    getActivityFeedData(this.props.user, (activityFeedData)=>{
      this.setState(activityFeedData);
    });
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
  }
}
