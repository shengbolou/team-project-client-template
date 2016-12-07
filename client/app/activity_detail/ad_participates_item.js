import React from 'React';
import {hashHistory} from 'react-router';

export default class Ad_participates_item extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }

  handleRedirect(e){
    e.preventDefault();
    hashHistory.push("profile/"+this.state._id);
  }

    render(){
      return(
        <li className="media">
          <div className="media-left">
            <a onClick={(e)=>this.handleRedirect(e)} data-dismiss="modal" aria-label="Close">
              <img className="media-object" src={this.state.avatar} height="55px" alt="..."/>
            </a>
          </div>
          <div className="media-body media-top">
            {this.state.firstname} {this.state.lastname}<br/>
            {this.state.ps}
        </div>
        <div className="media-body media-right" style={{textAlign:"right"}} >
          <a href="#"><span className="glyphicon glyphicon-plus"  style={{'paddingRight':'20px',textAlign:"right"}}></span></a>
        </div>
      </li>
      )
    }
}
