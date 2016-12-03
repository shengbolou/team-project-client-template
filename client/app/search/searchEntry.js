import React from 'react';
import {searchquery} from '../server';
import ActivityFeedItem from '../activity/activityFeedItem';
import SearchFeedUserFeedItem from './searchFeedUserFeedItem';
import PostFeedItem from '../post/postFeedItem';

export default class SearchEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      searchDataResult:{},
      title: ""
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      var query = this.state.value.trim();
      if (query !== "") {
        searchquery(this.props.user,query,(searchData)=>
            this.setState(
              {
                searchDataResult:searchData,
                title: "Search result for "+query+": "
              }
            )
        )
      }
    }
  }


  render(){
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="media">
              <div className="media-body">
                <input type="text" className="form-control" placeholder="Welcome to We Meet, please search" onChange={(e) => this.handleChange(e)}
              onKeyUp={(e) => this.handleKeyUp(e)}/>
              </div>
            </div>
          </div>
        </div>
        <h4 style={{marginBottom:'10'}}>{this.state.title}</h4>
          {
            this.state.searchDataResult.users=== undefined ? [] : this.state.searchDataResult.users.map((users,i)=>{
              return (
                <SearchFeedUserFeedItem key={i} data={users}/>
              )
            })
          }

          {
            this.state.searchDataResult.activities === undefined ? [] : this.state.searchDataResult.activities.map((activity,i)=>{
              return (
                <ActivityFeedItem key={i} data={activity}/>
              )
            })
          }
          {
            this.state.searchDataResult.posts === undefined ? [] : this.state.searchDataResult.posts.map((post,i)=>{
              return (
                <PostFeedItem key={i} data={post} currentUser={this.props.user}/>
              )
            })
          }
      </div>
    );
  }
}
