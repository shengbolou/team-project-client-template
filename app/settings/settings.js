import React from 'react';
import Navbar from '../component/navbar';

export default class Settings extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-1 infos">
              <h4><span><i className="fa fa-cog" aria-hidden="true"></i></span> Settings</h4>
              <div className="panel panel-default personal-info-1">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Personal Info</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="md-form">
                              <input type="text" id="" className="form-control" />
                              <label htmlFor="form1" className="">LastName</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="md-form">
                              <input type="text" id="" className="form-control" />
                              <label htmlFor="form1" className="">FirstName</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="md-form">
                              <input type="text" id="" className="form-control" />
                              <label htmlFor="form1" className="">NickName</label>
                          </div>
                          <div className="md-form">
                              <textarea type="text" id="" className="md-textarea"></textarea>
                              <label htmlFor="form7">About you</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <h4>Location</h4>
                      <div className="md-form" style={{"marginTop":'20'}}>
                          <input type="text" id="" className="form-control"/>
                          <label htmlFor="form1" className="">Country</label>
                      </div>
                      <div className="md-form">
                          <input type="text" id="" className="form-control"/>
                          <label htmlFor="form1" className="">State</label>
                      </div>
                      <div className="md-form">
                          <input type="text" id="" className="form-control"/>
                          <label htmlFor="form1" className="">City</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel-footer">
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-blue-grey pull-right" name="button">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 system-settings">
              <div className="list-group">
                <a className="list-group-item"data-toggle="collapse" data-parent="#accordion" href="#reset-password" aria-expanded="true" aria-controls="reset-password">
                  Reset Password <span className="pull-right"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>
                <div id="reset-password" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Old password</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">New password</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="password" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Repeat password</label>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button">Submit</button>
                  </div>
                </div>
                <a className="list-group-item"data-toggle="collapse" data-parent="#accordion" href="#reset-email" aria-expanded="true" aria-controls="reset-password">
                  Reset Email <span className="pull-right"><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                </a>
                <div id="reset-email" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <div className="panel-body">
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">Old Email</label>
                    </div>
                    <div className="md-form" style={{"marginTop":'20'}}>
                        <input type="email" id="" className="form-control"/>
                        <label htmlFor="Form1" className="">New Email</label>
                    </div>
                    <button type="button" className="btn btn-blue-grey pull-right" name="button">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
