import React from 'react';
import PostFeedItem from './postFeedItem';
import {getPostFeedData} from '../server';

export default class PostFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "contents": []
    }
  }

  getData(){
    getPostFeedData(this.props.user, (postFeedData)=>{
      this.setState(postFeedData);
    });
  }

  render(){
    return (
      <div>
        {this.state.contents.map((postFeedItem)=>{
          return <PostFeedItem key={postFeedItem._id} data={postFeedItem} />
        })}
      </div>
    );
  }

  componentDidMount(){
    this.getData();
  }
}
