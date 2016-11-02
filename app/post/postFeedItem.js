import React from 'react';
import PostComment from './postComment';
import PostCommentEntry from './postCommentEntry';
import PostCommentThread from './postCommentThread';

export default class PostFeedItem extends React.Component{
  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."></img>
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">David</h4>20hr
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </p>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <img src="img/tmp.jpg" width="100%" height="100%" alt="" />
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-12">
              <a href="#"><span className="glyphicon glyphicon-heart"></span>11</a>
              <a href="#"><span className="glyphicon glyphicon-comment"></span>12</a>

              <PostCommentThread>
                <PostComment />
              </PostCommentThread>

              <PostCommentEntry />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
