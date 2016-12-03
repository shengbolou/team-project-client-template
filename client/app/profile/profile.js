import React from 'react';
import Navbar from '../component/navbar';
import ProfileMainFeed from './profileMainFeed';
import ProfilePersonalInfo from './profilePersonalInfo';
import ProfileRecentActivityFeed from './profileRecentActivityFeed';
import ProfileRecentPostFeed from './profileRecentPostFeed';
import {getUserData} from '../server';

export default class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currUser: {},
      user: {}
    };
  }

  getData(currUser,user){
    getUserData(currUser, (userData)=>{
        this.setState({
          currUser: userData
        });
    });
    getUserData(user, (userData)=>{
        this.setState({
          user:userData
        });
    });
  }

  componentDidMount(){
    this.getData(this.props.currUser,this.props.user);
  }

  componentWillReceiveProps(newProps){
    this.getData(newProps.currUser,newProps.user);
  }

  render(){
    return(
      <div>
        <Navbar user={this.state.currUser}/>
        <div className="container profile">
          <div className="row">
            <div className="col-md-11 col-md-offset-1">
              <div className="row">
                <div className="col-md-7">
                  <h4>
                    <span className="glyphicon glyphicon-user"></span>
                    Profile
                  </h4>
                </div>
              </div>

              <ProfileMainFeed user={this.state.user} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <h4>Personal Info</h4>
              <ProfilePersonalInfo user={this.state.user} />
            </div>
            <div className="col-md-4">
              Recent Activities
              <div className="row sidebar">
                <ProfileRecentActivityFeed user={this.props.user} />
                <ProfileRecentPostFeed user={this.props.user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
