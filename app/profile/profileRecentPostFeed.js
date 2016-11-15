import React from 'react';
import {getPostFeedData} from '../server';
import ProfileRecentPostItem from './profileRecentPostItem';

export default class ProfileRecentPostFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "contents": []
    };
  }

  getData(){
    getPostFeedData(this.props.userId, (post) => {
        this.setState(post);
    });
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    return(
      <div>
        {this.state.contents.map((postItem)=>{
          return <ProfileRecentPostItem key={postItem._id} data={postItem} currentUser={this.props.user._id}/>
        })}
      </div>
    );
  }
}
