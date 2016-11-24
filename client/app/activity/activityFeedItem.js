import React from 'react';
import {Link} from 'react-router';
var moment = require('moment');

export default class ActivityFeedItem extends React.Component{

  constructor(props){
    super(props);
    this.state = props.data;
  }

  render(){
    var startTime = moment(this.state.startTime).calendar();
    var endTime = moment(this.state.endTime).calendar();
    return(
      <div>
        <div className="panel panel-default">
          <Link to={"activity_detail/"+this.state._id}>
            <div className="panel-heading">
              <h3>{this.state.title} <span className="badge pull-right">{this.state.type}</span></h3>
              <h5 className="">{startTime}--{endTime}</h5>
            </div>
          </Link>
          <div className="panel-body" style={{'textAlign':'justify'}}>
            <div className="media">
              <div className="media-left media-middle">
                <Link to={"activity_detail/"+this.state._id}>
                  <img className="media-object" src={this.state.img} width="200px" height="120px;" alt="..." />
                </Link>
              </div>
              <div className="media-body">
                {this.state.description}
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-md-12">
                <h5 className="pull-left"><span className="glyphicon glyphicon-map-marker"></span>{this.state.location}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
