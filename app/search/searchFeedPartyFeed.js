import React from 'react';
export default class SearchFeedPartyFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className="panel panel-default searching-event">
        <div className="panel-heading">
          <h3>Parties Posts</h3>
        </div>
        <div className="panel-body">

          <div className="media">
            <div className="media-left">
              <img src="img/parties.jpg" height="165px" width= "200px"/>
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
            <br/>
            <span className="glyphicon glyphicon-map-marker"></span>
            Amherst,MA,USA
            <span className="pull-right">"10/26/2016 7:00pm--9:00pm"</span>
          </div>
          <br/>
          <div className="media">
            <div className="media-left">
              <img src="img/Birthday-Party.jpg" height="165px" width= "200px"/>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-5">
                  <a href="# "><h4 className="parties-title">birthday party</h4></a>
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
            <br/>
            <span className="glyphicon glyphicon-map-marker"></span>
            Amherst,MA,USA
            <span className="pull-right">"10/27/2016 5:00pm--10:00pm"</span>
          </div>

        </div>
      </div>

    );
  }



}
