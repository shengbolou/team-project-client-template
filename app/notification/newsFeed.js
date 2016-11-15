import React from 'react';
import {Link} from 'react-router';

export default class NewsFeed extends React.Component{

  handleDelete(e){
    e.preventDefault();
    this.props.onDelete(this.props.data._id);
  }

  render(){
    return(
      <div className="row friend-request">
          <div className="col-md-9">
              <div className="media">
                  <div className="media-left">
                      <Link to={"profile/"+this.props.data.author._id}>
                          <img className="media-object" src={this.props.data.author.avatar} width="50px" height="50px" alt="..." />
                      </Link>
                  </div>
                  <div className="media-body">
                      <h4 className="media-heading">
                        <Link to={"profile/"+this.props.data.author._id}>
                          {this.props.data.author.firstname}{this.props.data.author.lastname}
                        </Link>
                      </h4>
                        <Link to={"profile/"+this.props.data.author._id}>posted a new activity</Link>
                  </div>
              </div>
          </div>

          <div className="col-md-3 pull-right">
              <button type="button" className="btn btn-sm btn-blue-grey pull-right" onClick={(e)=>this.handleDelete(e)} name="button">Delete</button>
          </div>
      </div>
    );
  }
}
