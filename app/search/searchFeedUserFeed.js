import React from 'react';
import SearchFeedUserFeedItem from './searchFeedUserFeedItem';

export default class SearchFeedUserFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className="panel panel-default searching-user">
        <div className="panel-heading">
          <h3>User</h3>
        </div>
        <div className="panel-body">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."  />
              </a>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-4">
                  <h4 className="media-heading">Tom</h4>
                  This is Tom
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="#"><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    Amherst, MA, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."  />
              </a>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-4">
                  <h4 className="media-heading">Emily</h4>
                  This is Emily
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="#"><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    Amherst, MA, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."  />
              </a>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-4">
                  <h4 className="media-heading">Adams</h4>
                  This is Adams
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="#"><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    Amherst, MA, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."  />
              </a>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-4">
                  <h4 className="media-heading">Jack</h4>
                  This is Jack
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="#"><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    Amherst, MA, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src="img/user.png" width="50px" height="50px" alt="..."  />
              </a>
            </div>
            <div className="media-body">
              <div className="row">
                <div className="col-md-4">
                  <h4 className="media-heading">Juliet</h4>
                  This is Juliet
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="#"><i className="fa fa-user-plus pull-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                  <div className="location pull-right">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    Amherst, MA, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchFeedUserFeedItem user={1}/>
        </div>
      </div>
    );
  }


}
