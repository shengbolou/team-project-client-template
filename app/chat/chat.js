import React from 'react';
import Navbar from '../component/navbar';
import {getUserData} from '../server'

export default class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  getData(){
    getUserData(this.props.user,(userData)=>{
      this.setState(userData);
    });
  }
  render(){
    return(
      <div>
        <Navbar chat="active" user={this.state}/>

          <div className = "container">
            <div className ="row" >

              <div className = "col-md-4 col-sm-4 col-xs-4 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 chat-left">

                <div className="panel panel-dafault">

                  <div className="panel-heading panel-heading-chat">
                    <ul className="nav nav-pills nav-justified">
                      <li role="presentation" className="active"><a href="#">Chat</a></li>
                      <li role="presentation"><a href="#">Friends</a></li>
                    </ul>
                  </div>


                  <div className = "panel-body" >

                    <ul className = "list-group friends" style={{'marginBottom':'0px','marginTop': '-1px'}}>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">
                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 1</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2%" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 1</font>
                          </div>
                        </div></li>
                        <li className = "list-group-item">
                          <div className="media">
                            <a className="media-left" href="#">
                              <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                            </a>
                            <div className="media-body">
                              <div className="media-heading">

                                <div className="media">
                                  <div className="media-left media-body">
                                    <font size="3">Name 2</font>
                                  </div>
                                  <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                    <font size="2" color="grey">16:00 09/24</font>
                                  </div>
                                </div>
                              </div>
                              <font size="2" color="grey "> The last messege from Name 3</font>
                            </div>
                          </div>
                        </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 3</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 3</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 5</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 5</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                      <li className = "list-group-item">
                        <div className="media">
                          <a className="media-left" href="#">
                            <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                          </a>
                          <div className="media-body">
                            <div className="media-heading">

                              <div className="media">
                                <div className="media-left media-body">
                                  <font size="3">Name 4</font>
                                </div>
                                <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                                  <font size="2" color="grey">16:00 09/24</font>
                                </div>
                              </div>
                            </div>
                            <font size="2" color="grey "> The last messege from Name 4</font>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>


                </div>
              </div>

              <div className = "col-md-7 col-sm-7 col-xs-7 chat-right" style={{'paddingLeft': '0px'}}>
                <div className="panel panel-dafault" style={{'height':'107%'}}>
                  <div className="panel-heading panel-heading-chatwindow">
                    <div className="media">
                      <a className="media-left" href="#">
                        <img className="media-object" src="img/user.png" alt="image" height="45" width="45"></img>
                      </a>
                      <div className="media-body" >
                        <div className="media-heading">

                          <div className="media">
                            <div className="media-left media-body">
                              <font size="3">Name 4</font>
                            </div>
                            <div className="media-body text-right" style={{'paddingRight': '0px'}}>
                              <div className="glyphicon glyphicon-info-sign" style={{'color':'grey','cursor': 'pointer'}}></div>
                            </div>
                          </div>
                        </div>
                        <font size="2" color="grey "> User title</font>
                      </div>
                    </div>
                  </div>

                  <div className="panel-body panel-body-chatwindow" style={{'height':'60vh'}}>
                    <div className="media friend-msg">
                      <div className="media-top">
                        At 20:07 on August 2
                      </div>
                      <div className="media-left ">
                        <a className="media-left" href="#">
                          <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                        </a>
                      </div>
                      <div className="media-body" style={{'paddingRight': '0px'}}>
                        <div className="msg">
                          sarrsamee rae hpinaut!  tait u myaha in  tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start  pyeenoutaahcawpine Bird  ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs  nhaint myawwataamayrik htuuhkyawan nhain
                        </div>
                      </div>
                    </div>
                    <div className="media my-msg">
                      <div className="media-top">
                        At 20:07 on August 2
                      </div>

                      <div className="media-body">
                        <div className="msg pull-right">
                          sarrsamee rae hpinaut!  tait u myaha in  tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start  pyeenoutaahcawpine Bird  ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs  nhaint myawwataamayrik htuuhkyawan nhain
                        </div>
                      </div>
                      <div className="media-right ">
                        <a className="media-right" href="#">
                          <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                        </a>
                      </div>

                    </div>
                    <div className="media friend-msg">
                      <div className="media-top">
                        At 20:07 on August 2
                      </div>
                      <div className="media-left ">
                        <a className="media-left" href="#">
                          <img className="media-object" src="img/user.png" alt="image" height="40" width="40"></img>
                        </a>
                      </div>
                      <div className="media-body" style={{'paddingRight': '0px'}}>
                        <div className="msg">
                          sarrsamee rae hpinaut!  tait u myaha in  tainrayy hk manaathpyan k nhaitsatoe lain mai aatainn hce linemyarrrae start  pyeenoutaahcawpine Bird  ko aanaeengaal laatmhaattway yanae noutsonenae hpyiteat . aouttobharl 1, bigwigs  nhaint myawwataamayrik htuuhkyawan nhain
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="panel-footer panel-footer-chatwindow" style={{'backgroundColor': 'white'}}>

                    <div className="row panel-icons" style={{'paddingTop': '10px'}}>
                      <div className="row container">
                        <div className="col-md-1 col-sm-1 col-xs-1">
                          <div className="glyphicon glyphicon-arrow-left" style={{'color':'#777'}}></div>
                        </div>


                        <div className="col-md-1 col-xs-1 col-sm-1">
                          <div className="glyphicon glyphicon-refresh" style={{'color':'#777'}}></div>
                        </div>

                        <div className="col-md-1 col-xs-1 col-sm-1">
                          <div className="glyphicon glyphicon-heart" style={{'color':'#777'}}></div>
                        </div>

                        <div className="col-md-1 col-xs-1 col-sm-1">
                          <div className="glyphicon glyphicon-option-horizontal" style={{'color':'#777'}}></div>
                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-md-10 col-xs-10 col-sm-10">
                        <textarea className="form-control msg nohover non-active" name="name" rows="3" cols="40" placeholder="please type text"></textarea>

                      </div>
                      <div className="col-md-2 col-sm-2 col-xs-2 send">
                        <button type="button" className="btn btn-blue-grey pull-right" name="button">Send</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

  componentDidMount(){
    this.getData();
  }
}
