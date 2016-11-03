import React from 'react';

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
              <a href="#">
                <img className="media-object" src={this.props.userAvatar} width="50px" height="50px" alt="..."></img>
              </a>
            </div>
            <div className="media-body">
              <textarea name="name" rows="8" cols="40" placeholder="What's on your mind"
                value={this.state.text} onChange={(e)=>this.handleChange(e)}></textarea>
              <div className="btn-group" role="group" aria-label="...">
                <a href="#"><i className="fa fa-camera" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-link" aria-hidden="true"></i></a>
              </div>
              <button type="button" className="btn btn-blue-grey pull-right" name="button" onClick={(e)=>this.handlePost(e)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
