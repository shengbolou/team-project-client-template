import React from 'react';

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
      this.props.onPostComment(this.state.text);
    }
  }

  render(){
    return(


      <div className="panel-heading">
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object" src="img/user.png" width="45px" height="45px" alt="..."/>
            </a>
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
