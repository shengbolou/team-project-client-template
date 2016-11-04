import React from 'react';
var moment = require('moment');

export default class PostComment extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
  }

  render(){
    var time = moment(this.state.postDate).format('MMMM Do YYYY, h:mm:ss a');

    if((new Date().getTime()) - this.state.postDate <= 86400000)
      time = moment(this.state.postDate).fromNow();

    return(
      <div>
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={this.state.author.avatar} width="45px" height="45px" alt="..."></img>
          </a>
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
