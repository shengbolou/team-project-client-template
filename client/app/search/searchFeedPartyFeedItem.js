import React from 'react';
import {getActivityDetail} from '../server';
import {Link} from 'react-router';
var moment = require('moment');

export default class SearchFeedPartyFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  getData(){
    getActivityDetail(this.props.Activity,(activityData)=>{
      this.setState(activityData);
    });
  }

  render(){
    return(
      <div className="media">
        <div className="media-left">
          <Link to={"activity_detail/"+this.state._id}><img src={this.state.img} height="150px" width= "200px"/></Link>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-5">
              <Link to={"activity_detail/"+this.state._id}><h4 className="parties-title">{this.state.title}</h4></Link>
            </div>
            <div className="col-md-7">
              <div className="pull-right badge">
                {this.state.type}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.state.description}
            </div>
          </div>
        </div>
        <br/>
        <span className="glyphicon glyphicon-map-marker"></span>
          {this.state.city}, {this.state.state}, {this.state.country}
        <span className="pull-right">{moment(this.state.startTime).calendar()} - {moment(this.state.endTime).calendar()}</span>
      </div>

    );
  }
  componentDidMount(){
    this.getData();
  }

}
