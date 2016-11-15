import React from 'React';
import Ad_comment from './ad_comment';

export default class Ad_body extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <div className= "adbackground">
          <img src="../img/HackUMass.JPG" />
      </div>
      <div className = "container">

        <div className="row">
          <div className = "col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1">
            <div className="panel panel-default body-title">
              <div className="panel-heading">

                <div className = "row">
                  <div className = "col-md-8" >
                    <h2 style={{'paddingLeft':'15px'}}>HackUMass</h2>
                    <div className="glyphicon glyphicon-time" style={{'paddingRight':'10px','paddingLeft': '15px'}}></div>
                    12:08 AM Saturday, October 8, 2016 (EDT)<br />

                  <div className="glyphicon glyphicon-map-marker" style={{'paddingRight':'10px','paddingTop':'5px','paddingLeft': '15px'}}></div>
                    University of Massachusetts Amherst
                  </div>
                  <div className = "col-md-4" style={{'paddingTop': '20px'}} >
                    <div className = "col-md-12 col-sm-12 col-xs-12 body-title-signed-in" align="left">
                      12 people <font style={{'color':'grey'}}>signed up  </font>
                    <font style={{'color':'#61B4E4','fontSize':'10px','paddingLeft':'10px','cursor':'pointer'}} data-toggle="modal" data-target="#myModal"  >  View All</font>
                      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h3 className="modal-title" id="myModalLabel">Participating users</h3>
                            </div>
                            <div className="modal-body">
                              <ul className="media-list">
                                <li className="media">
                                  <div className="media-left">
                                    <a href="profile.html">
                                      <img className="media-object" src="img/user.png" width="55px" alt="..."/>
                                    </a>
                                  </div>
                                  <div className="media-body media-top">
                                    User 1<br/>
                                    psersonal description for User 1
                                  </div>
                                  <div className="media-body media-right" style={{textAlign:"right"}} >
                                    <a href="#"><span className="glyphicon glyphicon-plus"  style={{'paddingRight':'20px',textAlign:"right"}}></span></a>
                                  </div>
                                </li>

                                <li className="media">
                                  <div className="media-left">
                                    <a href="profile.html">
                                      <img className="media-object" src="img/user.png" width="55px" alt="..."/>
                                    </a>
                                  </div>
                                  <div className="media-body media-top">
                                    User 3<br/>
                                    psersonal description for User 3
                                  </div>
                                  <div className="media-body media-right" style={{textAlign:"right"}}>
                                    <a href="#"><span className="glyphicon glyphicon-plus"  style={{'paddingRight':'20px'}}></span></a>
                                  </div>
                                </li>
                              </ul>
                            </div>

                          </div>
                        </div>
                      </div>
                      <br/>
                      <a href="profile.html">  <img src="./img/user.png" width="35px" alt=""/></a>
                      <a href="profile.html">  <img src="./img/user.png" width="35px" alt=""/></a>
                      <a href="profile.html">  <img src="./img/user.png" width="35px" alt=""/></a>
                      <a href="profile.html">  <img src="./img/user.png" width="35px" alt=""/></a>

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className = "col-md-12 col-sm-12 col-xs-12 remain-places" style={{'paddingTop':'25px',textAlign:"center"}} >
                  
                    <a href="#"><span className="btn btn-default sign-up-btn"  align="center">Click to Sign Up</span></a>
                  </div>
                </div>

                <div className="row">
                  <div className = "col-md-12 col-sm-12 col-xs-12 body-title-icon" style={{textAlign:"right"}}>
                    <a href="#"><span className="glyphicon glyphicon-heart" style={{'marginRight':'15px'}}></span>11</a>
                    <a href="#"><span className="glyphicon glyphicon-comment" style={{'marginRight':'15px','marginLeft':'15px'}}></span>0</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="container-fluid body-detail">
                  <h4 style={{'color': 'grey'}}>Activity Details</h4>
                  <div className="row">
                    <div className="col-md-12" style={{'paddingTop':'20px'}}>
                      <img src="./img/HackUMass-detail-1.png" width="100%" alt=""/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={{'paddingTop':'20px'}}>
                      Friday, October 7th
                      <p>6 PM - 9 PM: Check-in at Campus Center first floor, dinner at Blue Wall Cafe <br/>
                        9 PM - 10 PM: Opening ceremony in Campus Center Auditorium <br/>
                        10 PM: Move to Integrative Learning Center (ILC) <br/>
                        12 Midnight: Hacking begins in the ILC <br/>
                      </p>
                      <br/>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
      <Ad_comment id={this.props.id}/>
</div>
    )
  }

}
