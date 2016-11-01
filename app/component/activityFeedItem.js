import React from 'react';

export default class ActivityFeedItem extends React.Component{
  render(){
    return(
      <div>
        <div className="panel panel-default">
          <a href="activity-detail.html">
            <div className="panel-heading">
              <h3>Hack Umass <span className="badge pull-right">Event</span></h3>
              <h5 className="">10/26/2016 7:00pm--9:00pm</h5>
            </div>
          </a>
          <div className="panel-body" style={{'textAlign':'justify'}}>
            <div className="media">
              <div className="media-left media-middle">
                <a href="#">
                  <img className="media-object" src="img/HackUMass.jpg" width="200px" height="120px;" alt="..." />
                </a>
              </div>
              <div className="media-body">
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
              </div>
            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-md-12">
                <h5 className="pull-left"><span className="glyphicon glyphicon-map-marker"></span>Amherst</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
