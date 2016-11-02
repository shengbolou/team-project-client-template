import React from 'react';

export default class PostCommentEntry extends React.Component{
  render(){
    return(
      <div>
        <textarea name="name" rows="8" cols="40" placeholder="Write a comment"></textarea>
        <button className="btn btn-blue-grey pull-right" type="button" name="button">Submit</button>
      </div>
    );
  }
}
