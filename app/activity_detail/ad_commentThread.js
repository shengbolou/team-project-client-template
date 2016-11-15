import React from 'react';
import Ad_commentEntry from './ad_commentEntry';

export default class Ad_commentThread extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    return(
      <div className = "container">
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1">
          <div className="panel panel-default body-comments">
            <div className="panel-heading">
              <font style={{color:"grey",fontSize:"20px"}}>Wonderful comments (
                  {this.props.count}
                )</font>
              <Ad_commentEntry user={this.props.user}  avatar ={this.props.avatar} onPost={this.props.onPost}/>
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
