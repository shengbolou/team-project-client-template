import React from 'react';
import {likeActivity, unLikeActivity} from '../server';
import {Link} from 'react-router';

var moment = require('moment');

export default class ProfileRecentActivityItem extends React.Component{

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
        likeActivity(this.state._id,this.props.currentUser,cb);
      }
      else{
        unLikeActivity(this.state._id,this.props.currentUser,cb);
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
    var startTime = moment(this.state.startTime).calendar();
    var endTime = moment(this.state.endTime).calendar();
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              <Link to={"activity_detail/"+this.state._id}>
                <div className="media">
                  <h3>{this.state.title} <span className="badge pull-right">{this.state.type}</span></h3>
                  {startTime}--{endTime}
                </div>
              </Link>
            </div>
          </div>
          <div className="row content">
            <div className="panel-body">
              <div className="media">
                <div className="media-body">
                  <Link to={"activity_detail/"+this.state._id}>
                    <center><img className="media-object" src={this.state.img} width="100%" height="100%" alt="" /></center>
                  </Link>
                  <p>
                    {this.state.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  <a href="#" onClick={(e)=>this.handleLikeClick(e)}><span className="glyphicon glyphicon-heart"></span> {this.state.likeCounter.length}</a>
                  <span className="glyphicon glyphicon-comment"></span> {this.state.comments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
