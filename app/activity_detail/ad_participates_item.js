import React from 'React';

export default class Ad_participates_item extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }

    render(){
      return(
        <li className="media">
          <div className="media-left">
            <img className="media-object" src={this.state.avatar} width="55px" alt="..."/>
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
