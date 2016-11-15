import React from 'react';
import {getUserData} from '../server';
import {Link} from 'react-router';

export default class SearchFeedUserFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
      this.setState(userData);
    });
  }
  render(){
    return(
      <div className="media">
        <div className="media-left">
          <Link to={"profile/"+this.state._id}>
            <img className="media-object" src={this.state.avatar} width="50px" height="50px" alt="..." />
          </Link>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-8">
              <h4 className="media-heading">{this.state.firstname} {this.state.lastname}</h4>
              {this.state.description}
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <a href=""><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="location pull-right">
                <span className="glyphicon glyphicon-map-marker"></span>
                {this.state.city}, {this.state.state}, {this.state.country}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.getData();
  }

}
