import React from 'react';

export default class PostComment extends React.Component{
  render(){
    return(
      <div>
        <div className="media-left">
          <a href="#">
            <img className="media-object" src="img/user.png" width="45px" height="45px" alt="..."></img>
          </a>
        </div>
        <div className="media-body">
          <h5 className="media-heading">Louis <span className="pull-right">10h ago</span></h5>
          <p>
            Nice picture
          </p>
        </div>
      </div>
    );
  }
}
