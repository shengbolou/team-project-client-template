import React from 'react';
import {getSearchActivityFeedData} from '../server';

var moment = require('moment');

export default class SearchFeedPartyFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "type": "Event",
      "img":"img/HackUMass.jpg",
      "description": "Hack Umass",
      "country": "USA",
      "state": "MA",
      "city": "Amherst",
      "title": "HackUMass",
      "startTime": 1478129314000,
      "endTime": 1479940314000

    };
  }
  getData(){
    getSearchActivityFeedData(this.props.Activity,(activityData)=>{
      this.setState(activityData);
    });
  }

  render(){
    return(
      <div className="media">
        <div className="media-left">
          <img src={this.state.img} height="165px" width= "200px"/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-5">
              <a href="# "><h4 className="parties-title">{this.state.title}</h4></a>
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
        <span className="pull-right">start time:{moment(this.state.startTime).calendar()} end time:{moment(this.state.endTime).calendar()}</span>
      </div>

    );
  }
  componentDidMount(){
    this.getData();
  }

}
