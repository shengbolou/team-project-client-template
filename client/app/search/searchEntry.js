import React from 'react';

export default class SearchEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="media">
              <div className="media-body">
                <form className="search-form" role="search">
                  <input type="text" className="form-control" placeholder="Welcome to We Meet, please search"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
