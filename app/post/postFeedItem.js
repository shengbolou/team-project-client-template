import React from 'react';
import PostComment from './postComment';
import PostCommentThread from './postCommentThread';
import {unixTimeToString} from '../util'
import {postComment} from '../server';

export default class PostFeedItem extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
  }

  handlePostComment(comment){
    postComment(this.state._id, this.props.currentUser ,comment, (newFeedItem)=>{
      this.setState(newFeedItem);
    })
  }

  render(){
    var data = this.state;
    var contents;
    switch(data.type){
      case "general":
        contents = data.contents;
        break;
      default:
        throw new Error("Unknown FeedItem: " + data.type);
    }

    var img = <img src={contents.img} width="100%" height="100%" alt="" />;

    if(contents.img === null)
      img = null;

    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={contents.author.avatar} width="50px" height="50px" alt="..."></img>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{contents.author.firstname} {contents.author.lastname}</h4>
              {unixTimeToString(contents.postDate)}
            </div>
          </div>
        </div>
        <div className="panel-body">
          <p>
            {contents.text}
          </p>
          {img}
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-12">
              <a href="#"><span className="glyphicon glyphicon-heart"></span>{data.likeCounter.length}</a>
              <a href="#"><span className="glyphicon glyphicon-comment"></span>{data.comments.length}</a>

              <PostCommentThread onPostComment={(comment)=>this.handlePostComment(comment)}>
                {data.comments.map((comment,i)=>{
                  return (
                    <PostComment key={i} data={comment} />
                  )
                })}
              </PostCommentThread>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
