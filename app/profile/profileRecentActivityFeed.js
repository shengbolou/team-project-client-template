import React from 'react';
import {getActivityFeedData} from '../server';
import ProfileRecentActivityItem from './profileRecentActivityItem';

export default class ProfileRecentActivityFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "contents": []
    };
  }

  getData(){
    getActivityFeedData(this.props.user, (activity) => {
        this.setState(activity);
    });
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    return(
      <div>
        {this.state.contents.map((activityItem)=>{
          return <ProfileRecentActivityItem key={activityItem._id} data={activityItem} currentUser={this.props.user}/>
        })}
      </div>
    );
  }
}
