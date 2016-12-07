import React from 'react';
import {Link} from 'react-router';
var moment = require('moment');

export default class PostComment extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
  }

  render(){
    //default time format
    var time = moment(this.state.postDate).calendar();
    //if less than 24 hours, use relative time
    if((new Date().getTime()) - this.state.postDate <= 86400000)
      time = moment(this.state.postDate).fromNow();

    return(
      <div>
        <div className="media-left">
          <Link to={"profile/"+this.state.author._id}>
            <img className="media-object" src={this.state.author.avatar} height="45px" alt="..."></img>
          </Link>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.state.author.firstname} {this.state.author.lastname}
            <span className="pull-right">{time}</span></h5>
          <p style={{"marginTop": '10'}}>
            {this.state.text}
          </p>
        </div>
        <hr />
      </div>
    );
  }
}
