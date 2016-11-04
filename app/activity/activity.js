import React from 'react';
import ActivityFeed from './activityFeed';
import Navbar from '../component/navbar';
import {getUserData} from '../server'

export default class Activity extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
      this.setState(userData);
    });
  }
  render(){
    return(
      <div>
        <Navbar activity="active" user={this.state}/>
        <div className="container">
          <a href="postactivity.html" className="btn btn-lg btn-blue-grey c-btn" name = "button"><span className="glyphicon glyphicon-plus"></span></a>
          <div className="row">
            <div className="col-md-7 col-md-offset-2">
              <h4><span className="glyphicon glyphicon-flash" style={{'marginBottom':'10'}}></span>Recently Activities</h4>
              <ActivityFeed user={this.props.user}/>
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
