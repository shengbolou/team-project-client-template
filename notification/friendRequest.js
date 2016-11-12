import React from "react";

export default class Request extends React.Component{
  render(){
    return(
      <div className="row friend-request">
          <div className="col-md-8">
              <div className="media">
                  <div className="media-left">
                      <a href="#">
                          <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..." />
                      </a>
                  </div>
                  <div className="media-body">
                      <h4 className="media-heading">Shelley</h4> sent you a friend request
                  </div>
              </div>
          </div>

          <div className="col-md-4">
              <button type="button" className="btn btn-info" name="button">Accept</button>
              <button type="button" className="btn btn-info" name="button">Delete</button>
          </div>
      </div>
    );
  }
}
