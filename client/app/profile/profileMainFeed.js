import React from 'react';

export default class ProfileMainFeed extends React.Component{

  constructor(props){
    super(props);
    this.state = props.user;
  }

  componentWillReceiveProps(newProps){
    this.setState(newProps.user);
  }

  render(){
    var location = (this.state.location === undefined ||
                    this.state.location === null ||
                    Object.keys(this.state.location).length === 0 ?
                    "Earth" : this.state.location.formatted_address);
    return(
      <div className="panel panel-default main-panel">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4">
              <center>
                <img src={this.state.avatar} alt="" />
              </center>
            </div>
            <div className="col-md-8">
              <div className="media">
                <h3>{this.state.firstname} {this.state.lastname}</h3>
                {this.state.description}
                <div className="location">
                  <span className="glyphicon glyphicon-map-marker"></span>
                  {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
