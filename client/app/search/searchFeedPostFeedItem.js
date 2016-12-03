import React from 'react';
var moment = require('moment');


export default class SearchFeedPostFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }


  render(){
    var postTime = moment(this.state.contents.postTime).calendar();
    return(
        <div className="panel panel-default">
          <div className="media">
            <div className="media-body">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="media-heading">
                    {this.state.contents.author.firstname}.{this.state.contents.author.Lastname}
                  </h4>
                  {this.state.contents.text}
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">
                      <a href=""><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    {postTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }

}
