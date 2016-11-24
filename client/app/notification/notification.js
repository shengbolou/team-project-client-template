import React from 'react';
import NavTab from './navTabs';
import NotificationBody from './notificationBody';
import Navbar from '../component/navbar';
import {getUserData} from '../server';

export default class Notification extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  getData(){
    getUserData(this.props.user,(data)=>{
      this.setState(data);
    });
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    var navbar = <NavTab request="active"/>;
    if(this.props.id == 2){
      navbar = <NavTab news="active"/>;
    }

    return(
      <div>
        <Navbar user={this.state} notification="active"/>
        <div className="container">
          <div className="row notification">
            <div className="col-md-8 col-md-offset-2">
              <h4><span><i className="fa fa-bell-o bell" aria-hidden="true"></i></span>Notifications</h4>
              <div className="notification-panel">
                {navbar}
                <NotificationBody id={this.props.id} user={this.props.user}/>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}
