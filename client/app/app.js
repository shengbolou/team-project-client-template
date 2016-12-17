import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './activity/activity';
import Post from './post/post';
import Settings from './settings/settings';
import Chat from './chat/chat'
import Notification from './notification/notification';
import Search from './search/search';
import Profile from './profile/profile';
import PostActivity from './postactivity/postactivity';
import Activity_detail from './activity_detail/activity_detail';
import ErrorBanner from './component/errorbanner';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import {hideElement} from './util';
import {signup,login} from './server.js';
import {getUserId,isUserLoggedIn} from './credentials';
import {socket} from './credentials';

class ActivityPage extends React.Component{
  render(){
    if(isUserLoggedIn()){
      var userId = getUserId();
      return(
        <Activity user={userId}/>
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}
class ThrendPage extends React.Component{
  render(){
    if(isUserLoggedIn()){
      var userId = getUserId();
      return (<Post user={userId}/>);
    }
    else{
      hashHistory.push('/');
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <ErrorBanner />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

class SettingsPage extends React.Component {
  render() {
    if(isUserLoggedIn()){
      var userId = getUserId();
      return (
        <Settings user={userId} />
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}

class ChatPage extends React.Component{
  render() {
    if(isUserLoggedIn()){
      var userId = getUserId();
      return (
        <Chat user={userId}/>
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}

class NotificationPage extends React.Component{
  render(){
    if(isUserLoggedIn()){
      var userId = getUserId();
      return(
        <Notification user={userId} id={this.props.params.id}/>
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}

class Activity_detailPage extends React.Component{
  render(){
    if(isUserLoggedIn()){
      var userId = getUserId();
      return(
        <Activity_detail user={userId} id={this.props.params.id}/>
      )
    }
    else{
      hashHistory.push('/');
    }
  }
}
class SearchPage extends React.Component{
   render(){
     if(isUserLoggedIn()){
       var userId = getUserId();
       socket.emit('user',userId);
       return(
         <Search user={userId}/>
       );
     }
     else{
       hashHistory.push('/');
     }
  }
}

class ProfilePage extends React.Component{
  render(){
    if(isUserLoggedIn()){
      var userId = getUserId();
      socket.emit('user',userId);
      return(
        <Profile user={this.props.params.user} currUser={userId}/>
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}

class PostActivityPage extends React.Component {
  render() {
    if(isUserLoggedIn()){
      var userId = getUserId();
      socket.emit('user',userId);
      return (
        <PostActivity user={userId}/>
      );
    }
    else{
      hashHistory.push('/');
    }
  }
}

class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      signInEmail:"",
      signInPass:"",
      signUpEmail:"",
      signUpName:"",
      signUpPass:"",
      signUpPass2:"",
      failedLogin:false,
      failedSignUp:false,
      submitted:false
    }
  }

  handleChange(field, e) {
    e.preventDefault();
    var update = {};
    update[field] = e.target.value;
    this.setState(update);
  }

  hanleSignIn(e){
    e.preventDefault();
    this.setState({
      submitted:true
    });

    login(this.state.signInEmail,this.state.signInPass,(success)=>{
      if(success){
        this.setState({
          signInPass:"",
          signInEmail:"",
          failedLogin:false,
          submitted:false
        });
        hashHistory.push('/activity');
      }
      else{
        this.setState({
          failedLogin:true,
          submitted:false
        });
      }
    });

  }
  componentDidMount(){
    if(isUserLoggedIn()){
      hashHistory.push("/activity");
    }
  }

  handleSignUp(e){
    e.preventDefault();

    if(this.state.signUpName.trim()!==""&&
    this.state.signUpEmail!==""&&
    this.state.signUpPass!==""&&
    this.state.signUpPass===this.state.signUpPass2){
      this.setState({
        submitted:true
      });
      signup(this.state.signUpEmail,this.state.signUpName,this.state.signUpPass,(success)=>{
        if(success){
          login(this.state.signUpEmail,this.state.signUpPass,(success)=>{
            if(success){
              this.setState({
                signInPass:"",
                signInEmail:"",
                signUpEmail:"",
                signUpPass:"",
                signUpName:"",
                failedLogin:false,
                submitted:false,
                passwordError:false
              });
              hashHistory.push('/activity');
            }
            else{
              this.setState({
                failedLogin:true,
                submitted:false
              })
            }
          });
        }
        else{
          this.setState({
            failedSignUp:true,
            submitted:true
          });
        }
      });
    }
    else if(this.state.signUpPass2!==this.state.signUpPass){
      this.setState({
        passwordError:true
      })
    }
    else{
      this.setState({
        failedSignUp:true
      })
    }
  }

  render(){
    return(
      <div>
        <div className="bg">
          <div className="text-vertical-center">
            <h1 style={{color:'white'}}>WeMeet</h1>
            <h2 style={{color:'white'}}>Join nearby activities and make friends!</h2>
            <br/>
            <a href="#" className="btn btn-dark btn-lg">Sign up free today</a>
          </div>
        </div>
        <form className="container index LandingPage">
          <div className="row">

            <div className="col-md-6">
              <div className={"alert alert-danger " + hideElement(!this.state.failedLogin)} role="alert"><strong>Invalid email address or password.</strong> Please try a different email address or password, and try logging in again.</div>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h4>Sign in</h4>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-7 col-md-offset-2">
                      <div className="md-form">
                        <input disabled={this.state.submitted} type="text" className="form-control validate"
                          pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-‌​9-]+)*"
                          onChange={(e)=>this.handleChange("signInEmail",e)} required/>
                        <label>Email</label>
                      </div>
                    </div>
                    <div className="col-md-7 col-md-offset-2">
                      <div className="md-form">
                        <input disabled={this.state.submitted} type="password" className="form-control"
                          onChange={(e)=>this.handleChange("signInPass",e)}
                          required/>
                        <label>Password</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col-md-12">
                      <button disabled={this.state.submitted} type="submit" className="btn btn-default pull-right" onClick={(e)=>this.hanleSignIn(e)}>
                        Welcome back!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className={hideElement(!this.state.failedSignUp) + " alert alert-danger"} role="alert"><strong>
                Invalid account signup.</strong><br/>
              1.It is possible that you already have an account with that particular email address<br/>
            2.you didn't fill in all the blanks.
          </div>
          <div className={hideElement(!this.state.passwordError) + " alert alert-danger"} role="alert"><strong>
            Invalid account signup.</strong> two passwords don't match
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h4>Sign up</h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-7 col-md-offset-2">
                  <div className="md-form">
                    <input type="text" disabled={this.state.submitted} className="form-control" onChange={(e)=>this.handleChange("signUpName",e)}/>
                    <label>Username</label>
                  </div>
                </div>
                <div className="col-md-7 col-md-offset-2">
                  <div className="md-form">
                    <input type="email" disabled={this.state.submitted} className="form-control" onChange={(e)=>this.handleChange("signUpEmail",e)}/>
                    <label>Email</label>
                  </div>
                </div>
                <div className="col-md-7 col-md-offset-2">
                  <div className="md-form">
                    <input type="password" disabled={this.state.submitted} className="form-control" onChange={(e)=>this.handleChange("signUpPass",e)}/>
                    <label>Password</label>
                  </div>
                </div>
                <div className="col-md-7 col-md-offset-2">
                  <div className="md-form">
                    <input type="password" disabled={this.state.submitted} className="form-control" onChange={(e)=>this.handleChange("signUpPass2",e)}/>
                    <label>Repeat password</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  <button disabled={this.state.submitted} type="button" className="btn btn-default pull-right" onClick={(e)=>this.handleSignUp(e)}>
                    Join Us!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  </div>
    );
  }
}

//render main
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="post" component={ThrendPage} />
      <Route path="activity" component={ActivityPage} />
      <Route path="settings" component={SettingsPage} />
      <Route path="chat" component={ChatPage} />
      <Route path="notification" component={NotificationPage}>
        <Route path="/notification/:id" component={NotificationPage}/>
      </Route>
      <Route path="profile" component={ProfilePage}>
        <Route path="/profile/:user" component={ProfilePage} />
      </Route>
      <Route path="activity_detail" component={Activity_detailPage}>
        <Route path="/activity_detail/:id" component={Activity_detailPage}/>
      </Route>
      <Route path="search" component={SearchPage}/>
      <Route path="postactivity" component={PostActivityPage} />
      <Route path='*' component={ActivityPage} />
    </Route>
  </Router>

),document.getElementById('container'));
