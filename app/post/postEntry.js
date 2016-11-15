import React from 'react';
import {Link} from 'react-router';

export default class PostEntry extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({text:e.target.value});
  }

  handlePost(e){
    e.preventDefault();
    var text = this.state.text.trim();

    if(text !== ""){
      this.setState({text:""});
      this.props.onPost(text);
    }

  }

  render(){
    return(
      <div className="panel panel-default post-send">
        <div className="panel-heading">
          <div className="media">
            <div className="media-left">
              <Link to={"profile/"+this.props.userData._id}>
                <img className="media-object" src={this.props.userData.avatar} width="50px" height="50px" alt="..."></img>
              </Link>
            </div>
            <div className="media-body">
              <textarea name="name" rows="8" cols="40" placeholder="What's on your mind"
                value={this.state.text} onChange={(e)=>this.handleChange(e)}></textarea>
              <div className="btn-group" role="group" aria-label="...">
                <label htmlFor="pic">
                  <a><i className="fa fa-camera" aria-hidden="true"></i></a>
                </label>
                <input type="file" name="name" id="pic" value=""></input>
              </div>
              <button type="button" className="btn btn-blue-grey pull-right" name="button" onClick={(e)=>this.handlePost(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
