import React from 'react';
import Navbar from '../component/navbar';

export default class PostActivity extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData: {},
      activitiesData: {},
      type:"",
      title: "",
      img:"",
      startTime: '',
      endTime: '',
      description: "",
      location: ""
    }
  }




  render() {
    return (
      <div className='postactivity'>
        <Navbar user={this.state.userData}/>
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-2">
              <h4><span style={{
                  "marginRight":'10'
                }}><i className="glyphicon glyphicon-list-alt" aria-hidden="true"></i></span>Create Activity</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-md-offset-2 infos">
              <div className="panel panel-default personal-info-1">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Activity Info</h4>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.title}
                              onChange={(e)=>this.handleTitle(e)}/>
                            <label htmlFor="form1" className="">Title</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.startTime}
                              onChange={(e)=>this.handleStartTime(e)}/>
                            <label htmlFor="form1" className="">Start Time</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.endTime}
                              onChange={(e)=>this.handleEndTime(e)}/>
                            <label htmlFor="form1" className="">End Time</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                            <input type="text" id="" className="form-control"
                              value={this.state.location}
                              onChange={(e)=>this.handleLocation(e)}/>
                            <label htmlFor="form1" className="">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">

                            <br/>
                            <select  id="" className="form-control select">
                              <option>------Select a Activity Type-----</option>
                              <option value={"Event"}
                                onChange={(e)=>this.handleEvent(e)}>
                                Event</option>
                              <option value={"Entertainment"}
                                onChange={(e)=>this.handleEvent(e)}>Entertainment</option>
                              <option value={"Study"}
                                onChange={(e)=>this.handleEvent(e)}>Study</option>
                            </select>

                          </div>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                            <textarea type="text" id="" className="md-textarea"
                              value={this.state.description}
                              onChange={(e)=>this.handleDescription(e)}></textarea>
                            <label htmlFor="form7">Description</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-md-6 nopadding">
                        <button type="button" className="btn btn-blue-grey pull-Left nomargin" name="button" data-toggle="modal" data-target="#invitemodal">Invite Friend</button>
                        <div className="modal fade " id="invitemodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header" style={{
                                  "border":'none'
                                }}>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Invite friends</h4>
                                <hr />
                              </div>
                              <div className="modal-body " style={{
                                  "padding":'0'
                                }}>
                                <ul className="media-list">
                                  <li className="media" style={{
                                      "paddingLeft":'10',
                                      "paddingBottom":'10',
                                      "paddingTop":'10',
                                      "marginTop":'-20'
                                    }}>
                                    <div className="media-left">
                                      <a href="profile.html">
                                        <img className="media-object" src="img/user.png" width="45px" alt="..." />
                                      </a>
                                    </div>
                                    <div className="media-body media-top">
                                      User 1<br />
                                    <font color="grey">  psersonal description for User 1</font>
                                  </div>
                                  <div className="media-body media-right" align="right" style={{"paddingRight":'20'}}>
                                    <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                  </div>
                                  <hr/>
                                </li>
                                <li className="media" style={{
                                    "paddingLeft":'10',
                                    "paddingBottom":'10',
                                    "paddingTop":'10',
                                    "marginTop":'-20'
                                  }}>
                                  <div className="media-left">
                                    <a href="profile.html">
                                      <img className="media-object" src="img/user.png" width="45px" alt="..." />
                                    </a>
                                  </div>
                                  <div className="media-body media-top">
                                    User 1<br />
                                  <font color="grey">  psersonal description for User 1</font>
                                </div>
                                <div className="media-body media-right" align="right" style={{
                                    "paddingRight":'20'
                                  }}>
                                  <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                </div>
                                <hr />
                              </li>
                            </ul>
                          </div>

                          <div className="modal-footer" style={{
                              'border':'none'
                            }}>
                            <button type="button" className="btn btn-default btn-blue-grey" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-blue-grey">Confirm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label type="button" className="btn btn-blue-grey pull-left" name="button">
                      Upload IMG <input type="file" style={{"display":"none"}}/></label>
                  </div>
                  <div className="col-md-6 nopadding">
                    <button type="button" className="btn btn-blue-grey pull-right nomargin " name="button"  onClick={(e)=>this.handleSubmit(e)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
}
