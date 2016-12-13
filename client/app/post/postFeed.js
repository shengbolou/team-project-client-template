import React from 'react';
import PostEntry from './postEntry';
import PostFeedItem from './postFeedItem';
import {getAllPosts} from '../server';
import {postStatus} from '../server';


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
  }
}
