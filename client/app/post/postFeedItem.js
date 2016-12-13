import React from 'react';
import PostComment from './postComment';
import PostCommentThread from './postCommentThread';
import {postComment} from '../server';
import {likePost} from '../server';
import {unLikePost} from '../server';
import {Link} from 'react-router';
import Lightbox from 'react-images';
var moment = require('moment');

export default class PostFeedItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: props.data,
      isOpen:false
    };
  }

  handlePostComment(comment){
    postComment(this.state.data._id, this.props.currentUser ,comment, (newFeedItem)=>{
      this.setState(newFeedItem);
    })
  }

  handleImgClick(e){
    e.preventDefault();
    this.setState({
      isOpen:true
    });
  }
  closeLightbox(e){
    e.preventDefault();
    this.setState({
      isOpen:false
    })
  }

  handleLikeClick(e){
    e.preventDefault();

    if(e.button === 0){
      var cb = (likeCounter) => {
        this.setState({likeCounter:likeCounter});
      };

      if(!this.didUserLike(this.props.currentUser)){
        likePost(this.state.data._id,this.props.currentUser,cb);
      }
      else{
        unLikePost(this.state.data._id,this.props.currentUser,cb);
      }
    }
  }

  didUserLike(user) {
    var likeCounter = this.state.data.likeCounter;

    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === user)
        return true;
    }
    return false;
  }

  render(){
    var data = this.state.data;
    var contents;
    switch(data.type){
      case "general":
        contents = data.contents;
        break;
      default:
        throw new Error("Unknown FeedItem: " + data.type);
    }

    var img = <a onClick={(e)=>this.handleImgClick(e)}><img src={contents.img} width="100%" height="100%" alt="" /></a>;

    if(contents.img === null)
      img = null;

    var time = moment(contents.postDate).calendar();

    if((new Date().getTime()) - contents.postDate <= 86400000)
      time = moment(contents.postDate).fromNow();

    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="media">
            <div className="media-left">
              <Link to={"profile/"+contents.author._id}>
                <img className="media-object" src={contents.author.avatar} height="50px" alt="..."></img>
              </Link>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{contents.author.fullname} </h4>
              <span style={{"fontSize":"12"}}>{time}</span>
              <div className="pull-right">
                <span className="glyphicon glyphicon-map-marker"></span>
                  {Object.keys(contents.location).length>0 ?
                    (contents.location.address_components[3].short_name+","+
                    contents.location.address_components[5].short_name) : "Earth"}
              </div>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <p>
            {contents.text}
          </p>
          {
            img===null?null:
            <Lightbox
              images={[{ src: contents.img, caption: contents.text}]}
              isOpen={this.state.isOpen}
              onClose={(e)=>this.closeLightbox(e)}
              />
          }
          {img}
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-12">
              <a href="#" onClick={(e)=>this.handleLikeClick(e)}><span className="glyphicon glyphicon-heart"></span>{data.likeCounter.length}</a>
              <span className="glyphicon glyphicon-comment"></span>{data.comments.length}

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
