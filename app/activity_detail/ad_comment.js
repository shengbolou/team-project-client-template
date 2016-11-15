import React from 'React';

export default class Ad_comment extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = "container">
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1">
          <div className="panel panel-default body-comments">
            <div className="panel-heading">
              <font style={{color:"grey",fontSize:"20px"}}>Wonderful comments (3)</font>
              <div className="panel-heading">
                <div className="media">
                  <div className="media-left">
                    <a href="#">
                      <img className="media-object" src="img/user.png" width="45px" height="45px" alt="..."/>
                    </a>
                  </div>
                  <div className="media-body">
                    <textarea name="name" rows="8" cols="40" placeholder="Post your comments"></textarea>

                    <button type="button" className="btn btn-blue-grey pull-right waves-effect waves-light" name="button">Post</button>
                  </div>
                  <hr/>
                  <ul className="media-list">
                    <li className="media">
                      <div className="media-left">
                        <a href="profile.html">
                          <img className="media-object" src="img/user.png" width="45px" alt="..."/>
                        </a>
                      </div>
                      <div className="media-body media-top">
                        <h5>User 1 <small style={{marginLeft:"5px"}}>10-08 14:55 PM</small></h5>
                        fjbblaf;fblaiwbfilasbfibfliawbfilwbf!!!
                      </div>

                    </li>
                    <li className="media">
                      <div className="media-left">
                        <a href="profile.html">
                          <img className="media-object" src="img/user.png" width="45px" alt="..."/>
                        </a>
                      </div>
                      <div className="media-body media-top">
                        <h5>User 1 <small style={{marginLeft:"5px"}}>10-08 14:55 PM</small></h5>
                        fjbblaf;fblaiwbfilasbfibfliawbfilwbf!!!
                      </div>

                    </li>
                    <li className="media">
                      <div className="media-left">
                        <a href="profile.html">
                          <img className="media-object" src="img/user.png" width="45px" alt="..."/>
                        </a>
                      </div>
                      <div className="media-body media-top">
                        <h5>User 1 <small style={{marginLeft:"5"}}>10-08 14:55 PM</small></h5>
                        fjbblaf;fblaiwbfilasbfibfliawbfilwbf!!!
                      </div>

                    </li>
                  </ul>
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
