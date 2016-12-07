import React from 'React';
import {Link} from 'react-router';
var moment = require('moment');

export default class Ad_comment extends React.Component{

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
          <img className="media-object" src={this.state.author.avatar} height="45px" style={{marginTop:'10'}}/>
          </Link>
      </div>
      <div className="media-body media-top">
        <h5>{this.state.author.firstname} {this.state.author.lastname} <small style={{marginLeft:"5px"}}>{time}</small></h5>
        {this.state.text}
      </div>
    </div>
    );
  }
}
