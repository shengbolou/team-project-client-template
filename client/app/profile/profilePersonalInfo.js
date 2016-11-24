import React from 'react';
import {getUserData} from '../server';

export default class ProfilePersonalInfo extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
        this.setState(userData);
    });
  }

  componentDidMount(){
    this.getData();
  }

  countProgress(){
    var count = 0.0;
    if (this.state.firstname != null){
      count += 1;
    }
    if (this.state.lastname != null){
      count += 1;
    }
    if (this.state.nickname != null){
      count += 1;
    }
    if (this.state.description != null){
      count += 1;
    }
    if (this.state.country != null){
      count += 1;
    }
    if (this.state.state != null){
      count += 1;
    }
    if (this.state.city != null){
      count += 1;
    }
    if (this.state.email != null){
      count += 1;
    }
    if (this.state.dob_year != null && this.state.dob_month != null && this.state.dob_day != null){
      count += 1;
    }
    return count / 9 * 100 | 0;
  }

  render(){
    var progress = this.countProgress();

    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="media">
              You've completed {progress}% of profile.
              <br />
              <progress value={progress} max="100"></progress>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="media">
              <div>
                <b>Email</b>
                <br />
                <div className="col-md-offset-1">
                  {this.state.email}
                </div>
              </div>
              <div>
                <b>Birthday</b>
                <br />
                <div className="col-md-offset-1">
                  {this.state.dob_month}/{this.state.dob_day}/{this.state.dob_year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
