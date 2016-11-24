import React from 'react';
import ActivityFeedItem from './activityFeedItem';
import {getActivityFeedData} from '../server';

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
