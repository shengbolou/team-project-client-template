import React from 'react';

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
                      <a href="#">
                          <img className="media-object" src={this.props.data.author.avatar} width="50px" height="50px" alt="..." />
                      </a>
                  </div>
                  <div className="media-body">
                      <h4 className="media-heading">
                        <a href="#">{this.props.data.author.firstname}{this.props.data.author.lastname}</a>
                      </h4>
                        <a href="#">posted a new activity</a>
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
