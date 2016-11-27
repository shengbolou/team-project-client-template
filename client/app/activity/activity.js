import React from 'react';
import ActivityFeed from './activityFeed';
import Navbar from '../component/navbar';
import {getUserData,getlocation,setlocation} from '../server';
import {Link} from 'react-router';

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
        <div className="container index">
          <Link to="postactivity" className="btn btn-lg btn-blue-grey c-btn" name = "button">
            <span className="glyphicon glyphicon-plus"></span>
          </Link>
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
    getlocation((res)=>{
      if(res.status === "OK" && res.results.length > 0 && res.results[0] !== this.state.location)
        setlocation(this.props.user,res.results[0]);
    });
  }
}
