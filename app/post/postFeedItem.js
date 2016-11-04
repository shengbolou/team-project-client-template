import React from 'react';
import PostComment from './postComment';
import PostCommentThread from './postCommentThread';
import {postComment} from '../server';
import {likePost} from '../server';
import {unLikePost} from '../server';
var moment = require('moment');

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

  handleLikeClick(e){
    e.preventDefault();

    if(e.button === 0){
      var cb = (likeCounter) => {
        this.setState({likeCounter:likeCounter});
      };

      if(!this.didUserLike(this.props.currentUser)){
        likePost(this.state._id,this.props.currentUser,cb);
      }
      else{
        unLikePost(this.state._id,this.props.currentUser,cb);
      }
    }

  }

  didUserLike(user) {
    var likeCounter = this.state.likeCounter;

    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === user)
        return true;
    }
    return false;
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

    var time = moment(contents.postDate).format('MMMM Do YYYY, h:mm:ss a');

    if((new Date().getTime()) - contents.postDate <= 86400000)
      time = moment(contents.postDate).fromNow();

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
              <span style={{"fontSize":"12"}}>{time}</span>
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
              <a href="#" onClick={(e)=>this.handleLikeClick(e)}><span className="glyphicon glyphicon-heart"></span>{data.likeCounter.length}</a>
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
