import React from 'react';

export default class NewsFeed extends React.Component{
  render(){
    return(
      <div className="row friend-request">
          <div className="col-md-9">
              <div className="media">
                  <div className="media-left">
                      <a href="#">
                          <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..." />
                      </a>
                  </div>
                  <div className="media-body">
                      <h4 className="media-heading">
                        <a href="#">Sara</a>
                      </h4>
                        <a href="#">posted a new activity</a>
                  </div>
              </div>
          </div>

          <div className="col-md-3">
              <button type="button" className="btn btn-info" name="button">Delete</button>
          </div>
      </div>
    );
  }
}
