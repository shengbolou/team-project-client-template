import React from 'react';
import {Link} from 'react-router';

export default class NavTab extends React.Component{
  render(){
    return(
      <ul className="nav nav-tabs nav-justified">
          <li role="presentation" className={this.props.request}>
              <Link to="/notification/1"><span className="glyphicon glyphicon-user"></span>
            Friend Request</Link>
          </li>
          <li role="presentation" className={this.props.news}>
              <Link to="/notification/2"><span className="glyphicon glyphicon-th-list"></span>  News Feed</Link>
          </li>
      </ul>
    );
  }
}
