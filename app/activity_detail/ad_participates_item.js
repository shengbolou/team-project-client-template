import React from 'React';

export default class Ad_participates_item extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      return(
        <li className="media">
          <div className="media-left">
            <a href="profile.html">
              <img className="media-object" src={this.props.avator} width="55px" alt="..."/>
            </a>
          </div>
          <div className="media-body media-top">
            {this.props.firstname} {this.props.lastname}<br/>
          {this.props.ps}
        </div>
        <div className="media-body media-right" style={{textAlign:"right"}} >
          <a href="#"><span className="glyphicon glyphicon-plus"  style={{'paddingRight':'20px',textAlign:"right"}}></span></a>
        </div>
      </li>
      )
    }
}
