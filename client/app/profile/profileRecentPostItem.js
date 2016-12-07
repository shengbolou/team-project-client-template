import React from 'react';
import {likePost, unLikePost} from '../server';

var moment = require('moment');

export default class ProfileRecentPostItem extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
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

    var time = moment(contents.postDate).calendar();

    if((new Date().getTime()) - contents.postDate <= 86400000)
      time = moment(contents.postDate).fromNow();

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-2">
              <img src={contents.author.avatar} height="50px" alt="" />
            </div>
            <div className="col-md-10">
              <div className="media">
                {contents.author.firstname}
                <br />
                {time}
              </div>
            </div>
          </div>
          <div className="row content">
            <div className="panel-body">
              <div className="media">
                <div className="media-body">
                  <p>
                    {contents.text}
                  </p>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <center>{img}</center>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  <a href="#" onClick={(e)=>this.handleLikeClick(e)}><span className="glyphicon glyphicon-heart"></span>{data.likeCounter.length}</a>
                  <span className="glyphicon glyphicon-comment"></span>{data.comments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
