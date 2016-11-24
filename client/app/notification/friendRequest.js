import React from 'react';
import {Link} from 'react-router';

export default class Request extends React.Component{
  handleDelete(e){
    e.preventDefault();
    this.props.onDelete(this.props.data._id);
  }
  handleAccept(e){
    e.preventDefault();
    this.props.onAccept(this.props.data._id);
  }
  render(){
    return(
      <div className="row friend-request">
          <div className="col-md-8">
              <div className="media">
                  <div className="media-left">
                      <Link to={"profile/"+this.props.data.sender._id}>
                          <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..." />
                      </Link>
                  </div>
                  <div className="media-body">
                      <h4 className="media-heading">{this.props.data.sender.firstname}{this.props.data.sender.lastname}</h4>
                       sent you a friend request
                  </div>
              </div>
          </div>

          <div className="col-md-3 pull-right">
              <button type="button" className="btn btn-sm btn-blue-grey" name="button" onClick={(e)=>this.handleAccept(e)}>Accept</button>
              <button type="button" className="btn btn-sm btn-blue-grey pull-right" onClick={(e)=>this.handleDelete(e)} name="button">Delete</button>
          </div>
      </div>
    );
  }
}
