import React from 'react';
import {Link} from 'react-router';

export default class PostCommentEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({text: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.text.trim() !== ""){
      this.setState({text:""});
      this.props.onPost(this.state.text);
    }
  }

  render(){
    return(
      <div className="panel-heading">
        <div className="media">
          <div className="media-left">
            <Link to={"profile/"+this.props.user}>
              <img className="media-object" src={this.props.avatar} height="45px" style={{marginTop:'10'}}/>
            </Link>
          </div>
          <div className="media-body">
            <textarea name="name" rows="8" cols="40" placeholder="Post your comments" value={this.state.text} onChange={(e)=>this.handleChange(e)}></textarea>

            <button type="button" className="btn btn-blue-grey pull-right waves-effect waves-light" type="button" name="button" onClick={(e)=>this.handleSubmit(e)}>Post</button>
          </div>
        </div>
      </div>


    );
  }
}
