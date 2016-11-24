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
      <div>
        <textarea name="name" rows="8" cols="40" placeholder="Write a comment" value={this.state.text} onChange={(e)=>this.handleChange(e)}></textarea>
        <button className="btn btn-blue-grey pull-right" type="button" name="button" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
      </div>
    );
  }
}
