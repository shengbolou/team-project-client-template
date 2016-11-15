import React from 'react';
export default class CommentEntry extends React.Component {
    render() {
        return (
        <div>
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-md-offset-2">
                    <h4><span style="margin-right:10px;"><i className="glyphicon glyphicon-list-alt" aria-hidden="true"></i></span>Create Activity</h4>
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
                                                <input type="text" id="" className="form-control">
                                                <label for="form1" className="">Title</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="md-form">
                                                <input type="text" id="" className="form-control">
                                                <label for="form1" className="">Start Time</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="md-form">
                                                <input type="text" id="" className="form-control">
                                                <label for="form1" className="">End Time</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="md-form">
                                                <input type="text" id="" className="form-control">
                                                <label for="form1" className="">Location</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="md-form">
                                                <br/>
                                                <select  id="" className="form-control">
                                                    <option>------Select a Activity Type-----</option>
                                                    <option>Event</option>
                                                    <option>Entertainment</option>
                                                    <option>Study</option>
                                                </select>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form">
                                                <input type="text" id="" className="form-control">
                                                <label for="form1" className="">IMG Upload</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form">
                                                <textarea type="text" id="" className="md-textarea"></textarea>
                                                <label for="form7">Description</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-blue-grey pull-Left" name="button" data-toggle="modal" data-target="#invitemodal">Invite Friend</button>
                                        <div className="modal fade " id="invitemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header" style="border:none;">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title" id="myModalLabel">Invite friends</h4>
                                                        <hr>
                                                    </div>
                                                    <div className="modal-body " style="padding:0;">
                                                        <ul className="media-list">
                                                            <li className="media" style="padding-left:10px;padding-bottom:10px;padding-top:10px;margin-top:-20px">
                                                                <div className="media-left">
                                                                    <a href="profile.html">
                                                                        <img className="media-object" src="img/user.png" width="45px" alt="...">
                                                                    </a>
                                                                </div>
                                                                <div className="media-body media-top">
                                                                    User 1<br>
                                                                    <font color="grey">  psersonal description for User 1</font>
                                                                </div>
                                                                <div className="media-body media-right" align="right" style="padding-right:20px;">
                                                                    <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                                                </div>
                                                                <hr>
                                                            </li>
                                                            <li className="media" style="padding-left:10px;padding-bottom:10px;padding-top:10px;margin-top:-20px">
                                                                <div className="media-left">
                                                                    <a href="profile.html">
                                                                        <img className="media-object" src="img/user.png" width="45px" alt="...">
                                                                    </a>
                                                                </div>
                                                                <div className="media-body media-top">
                                                                    User 1<br>
                                                                    <font color="grey">  psersonal description for User 1</font>
                                                                </div>
                                                                <div className="media-body media-right" align="right" style="padding-right:20px;">
                                                                    <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                                                </div>
                                                                <hr>
                                                            </li>
                                                            <li className="media" style="padding-left:10px;padding-bottom:10px;padding-top:10px;margin-top:-20px">
                                                                <div className="media-left">
                                                                    <a href="profile.html">
                                                                        <img className="media-object" src="img/user.png" width="45px" alt="...">
                                                                    </a>
                                                                </div>
                                                                <div className="media-body media-top">
                                                                    User 1<br>
                                                                    <font color="grey">  psersonal description for User 1</font>
                                                                </div>
                                                                <div className="media-body media-right" align="right" style="padding-right:20px;">
                                                                    <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                                                </div>
                                                                <hr>
                                                            </li>
                                                            <li className="media" style="padding-left:10px;padding-bottom:10px;padding-top:10px;margin-top:-20px">
                                                                <div className="media-left">
                                                                    <a href="profile.html">
                                                                        <img className="media-object" src="img/user.png" width="45px" alt="...">
                                                                    </a>
                                                                </div>
                                                                <div className="media-body media-top">
                                                                    User 1<br>
                                                                    <font color="grey">  psersonal description for User 1</font>
                                                                </div>
                                                                <div className="media-body media-right" align="right" style="padding-right:20px;">
                                                                    <button type="button" className="btn btn-default btn-blue-grey"  name="button">Invite</button>

                                                                </div>
                                                                <hr>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div className="modal-footer" style="border:none;">
                                                        <button type="button" className="btn btn-default btn-blue-grey" data-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary btn-blue-grey">Confirm</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-blue-grey pull-right" name="button">Submit</button>
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
