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

  getData(user){
    getPostFeedData(user, (post) => {
        this.setState(post);
    });
  }

  componentDidMount(){
    this.getData(this.props.user);
  }
  componentWillReceiveProps(newProps){
    this.getData(newProps.user);
  }
  render(){
    return(
      <div>
        {this.state.contents.map((postItem)=>{
          return <ProfileRecentPostItem key={postItem._id} data={postItem} currentUser={this.props.user}/>
        })}
      </div>
    );
  }
}
