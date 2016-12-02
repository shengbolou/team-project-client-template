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

  getData(user){
    getActivityFeedData(user, (activity) => {
        this.setState(activity);
    });
  }

  componentWillReceiveProps(newProps){
      this.getData(newProps.user);
  }

  componentDidMount(){
    this.getData(this.props.user);
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
