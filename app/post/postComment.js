import React from 'react';
import {unixTimeToString} from '../util';

export default class PostComment extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
  }

  render(){
    return(
      <div>
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={this.state.author.avatar} width="45px" height="45px" alt="..."></img>
          </a>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.state.author.firstname} {this.state.author.lastname} <span className="pull-right">{unixTimeToString(this.state.postDate)}</span></h5>
          <p>
            {this.state.text}
          </p>
        </div>
        <hr />
      </div>
    );
  }
}
