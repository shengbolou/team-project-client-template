import React from 'react';
export default class SearchFeedPartyFeedItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <div className="media">
        <div className="media-left">
          <img src="img/parties.jpg" width="100%" height="100%" className="parties-pic"/>
        </div>
        <div className="media-body">
          <div className="row">
            <div className="col-md-5">
              <a href="# "><h4 className="parties-title">dancing party</h4></a>
            </div>
            <div className="col-md-7">
              <div className="pull-right badge">
                Party
              </div>
            </div>
          </div>
          <div className="row">
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
          </div>
        </div>
        <br>
        <span className="glyphicon glyphicon-map-marker"></span>
        Amherst,MA,USA
        <span className="pull-right">"10/26/2016 7:00pm--9:00pm"</span>
      </div>

    );
  }
}
