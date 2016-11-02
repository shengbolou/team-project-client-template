import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './activity/activity';
import Post from './post/post'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'


class ActivityPage extends React.Component{
  render(){
    return(
      <Activity />
    );
  }
}
class ThrendPage extends React.Component{
  render(){
    return(
      <Post />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

//render main
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ActivityPage} />
      <Route path="post" component={ThrendPage} />
    </Route>
  </Router>
),document.getElementById('container')
);
