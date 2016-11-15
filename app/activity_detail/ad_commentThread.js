import React from 'react';
import Ad_commentEntry from './ad_commentEntry';

export default class Ad_commentThread extends React.Component{
  render(){
    return(
      <div className = "container">
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1">
          <div className="panel panel-default body-comments">
            <div className="panel-heading">
              <font style={{color:"grey",fontSize:"20px"}}>Wonderful comments (3)</font>
              <Ad_commentEntry onPost={this.props.onPost}/>
                <hr/>
          <ul className="media-list">
          {React.Children.map(this.props.children,function(child){
            return (
              <li className="media">
                {child}
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </div>
      </div>
      </div>
    );
  }
}
