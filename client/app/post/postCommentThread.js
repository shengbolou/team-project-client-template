import React from 'react';
import PostCommentEntry from './postCommentEntry';

export default class PostCommentThread extends React.Component{
  render(){
    return(
      <div>
        <ul className="media-list comments" style={{'marginTop':'30'}}>
          {React.Children.map(this.props.children,function(child){
            return (
              <li className="media">
                {child}
              </li>
            );
          })}
        </ul>
        <PostCommentEntry onPostComment={this.props.onPostComment}/>
      </div>
    );
  }
}
