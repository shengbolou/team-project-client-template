import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './activity/activity';
import Post from './post/post';
import Settings from './settings/settings';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';



class ActivityPage extends React.Component{
  render(){
    return(
      <Activity user={1}/>
    );
  }
}
class ThrendPage extends React.Component{
  render(){
    return <Post user={1} />;
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
      <Settings />
    );
  }
}

//render main
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ActivityPage} />
      <Route path="post" component={ThrendPage} />
      <Route path="settings" component={SettingsPage} />
    </Route>
  </Router>
),document.getElementById('container'));
