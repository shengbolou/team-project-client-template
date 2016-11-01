import React from 'react';

export default class PostCommentThread extends React.Component{
  render(){
    return(
      <ul className="media-list comments" style={{'marginTop':'30'}}>
        {React.Children.map(this.props.children,function(child){
          return (
            <li className="media">
              {child}
            </li>
          );
        })}
        <hr />
      </ul>
    );
  }
}
