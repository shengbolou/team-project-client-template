import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './activity/activity';
import Post from './post/post';
import Settings from './settings/settings';
import Chat from './chat/chat'
import Notification from './notification/notification';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Activity_detail from './activity_detail/activity_detail';



class ActivityPage extends React.Component{
  render(){
    return(
      <Activity user={1}/>
    );
  }
}
class ThrendPage extends React.Component{
  render(){
    return (<Post user={1} />);
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class SettingsPage extends React.Component {
  render() {
    return (
      <Settings user={1} />
    );
  }
}

class ChatPage extends React.Component{
  render() {
    return (
      <Chat user={1} />
    )
  }
}

class NotificationPage extends React.Component{
  render(){
    return(
      <Notification user={1} id={this.props.params.id}/>
    );
  }
}

class Activity_detailPage extends React.Component{
  render(){
    return(
      <Activity_detail user ={1} />
    )
  }
}

//render main
ReactDOM.render((
  <Router history={hashHistory}>
     <Route path="/" component={App}>
       <IndexRoute component={ActivityPage} />
       <Route path="post" component={ThrendPage} />
       <Route path="settings" component={SettingsPage} />
       <Route path="chat" component={ChatPage} />
       <Route path="notification" component={NotificationPage}>
         <Route path="/notification/:id" component={NotificationPage}/>
       </Route>
       <Route path="activity_detail" component={Activity_detailPage}>
         <Route path="/activity_detail/:id" component={Activity_detailPage}/>
       </Route>

     </Route>
   </Router>
),document.getElementById('container'));
