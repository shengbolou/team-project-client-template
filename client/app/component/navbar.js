import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{
    render(){
      return(
        <div>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/">
                  <img src="./img/logo/mipmap-xxhdpi/ic_launcher.png" width="50px" height="50px" alt="" />
                </Link>
              </div>

              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav nav-left">
                  <li className={this.props.activity}>
                    <Link to={"/"}> Activities </Link>
                  </li>
                  <li className={this.props.post}>
                    <Link to={"post"}>Trend</Link>
                  </li>
                  <li className={this.props.chat}>
                    <Link to={"chat"}>Chat</Link>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <div className="dropdown pull-left">
                    <a href="#" className="dropdown-toggle" type="button" id="user-options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <img src={this.props.user.avatar} height="50px" alt="" /> {this.props.user.firstname}
                      <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="user-options">
                      <li><Link to={"profile/"+this.props.user._id}><span><i className="fa fa-user" aria-hidden="true"></i></span>Profile</Link></li>
                      <li><Link to="settings"><span><i className="fa fa-cog" aria-hidden="true"></i></span>Settings</Link></li>
                      <li><Link to="postactivity"><span><i className="fa fa-pencil" aria-hidden="true"></i></span>Create Activity</Link></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#"><span><i className="fa fa-sign-out" aria-hidden="true"></i></span>Log out</a></li>
                    </ul>
                  </div>
                    <li className={this.props.search}>
                      <Link to={"search"}><i className="fa fa-search" aria-hidden="true"/></Link>
                    </li>
                    <li className={this.props.notification}>
                      <Link to={"notification/"+1}><i className="fa fa-bell-o" aria-hidden="true"></i></Link>
                    </li>
                </ul>
              </div>
              {/*.navbar-collapse */}
            </div>
            {/*.container-fluid*/}
          </nav>
        </div>
      );
    }
}
