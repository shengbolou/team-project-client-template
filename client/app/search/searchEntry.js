import React from 'react';
import {searchquery} from '../server';
import {ActivityFeedItem} from '../activity/activityFeedItem';

export default class SearchEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      searchDataResult:[
        [],
        [],
        []
      ]
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      this.search();
    }
  }
  search() {
    var trimmedTerm = this.state.value.trim();
    if (trimmedTerm !== "") {
      searchquery(this.props.user,trimmedTerm,(searchData)=>
        this.setState({searchDataResult:searchData})
      )
    }
  }


  render(){
    var data0=this.state;
    var data1=this.state.searchDataResult;
    var data2=this.state.searchDataResult[1];
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="media">
              <div className="media-body">
                <form className="search-form" role="search">
                  <input type="text" className="form-control" placeholder="Welcome to We Meet, please search" onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
