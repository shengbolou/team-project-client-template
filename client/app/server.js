import {readDocument, writeDocument, addDocument} from './database.js';
var moment = require('moment');
var token = 'eyJpZCI6MX0=';


/**
* Properly configure+send an XMLHttpRequest with error handling,
* authorization token, and other needed properties.
*/
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that AppError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  // global AppError //
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      window.AppError('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    window.AppError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    window.AppError('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
    break;
      case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
    break;
      case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
    break;
      default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function getlocation(cb){

  var geolocation = require('geolocation');
  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
    'http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+","+position.coords.longitude+'&sensor=true');
    xhr.onload = function() {
      cb(JSON.parse(xhr.responseText));
    }
    // xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    xhr.send();
  });
}

export function setlocation(userId,location){
  sendXHR('PUT','/settings/location/'+userId,location,()=>{
  });
}


/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}


export function deleteNotification(id, user ,cb){
  sendXHR('DELETE','/notification/'+id+'/'+user,undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  });
}

export function acceptRequest(id,user,cb){
  sendXHR('PUT','/notification/'+id+'/'+user,undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  });
}

export function getNotificationData(user, cb){
  sendXHR('GET','/user/'+user+'/notification',undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  });
}

export function likePost(feedItemId, user, cb){
  sendXHR('PUT', '/postItem/'+feedItemId+'/likelist/'+user,
   undefined, (xhr)=>{
     cb(JSON.parse(xhr.responseText));
   });
}

export function unLikePost(feedItemId, user, cb){
  sendXHR('DELETE', '/postItem/'+feedItemId+'/likelist/'+user,
   undefined, (xhr)=>{
     cb(JSON.parse(xhr.responseText));
   });
}

export function likeActivity(activityId, user, cb){
  sendXHR('PUT', '/activityItem/' + activityId + '/likelist/' + user,
   undefined, (xhr) => {
     cb(JSON.parse(xhr.responseText));
   });
}

export function unLikeActivity(activityId, user, cb){
  sendXHR('DELETE', '/activityItem/' + activityId +'/likelist/' + user,
   undefined, (xhr) => {
     cb(JSON.parse(xhr.responseText));
   });
}

export function changeUserInfo(data, cb){
  sendXHR('PUT','/settings/user/'+data.userId,data,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}

export function changeEmail(data,cb){
  sendXHR('PUT','/settings/emailChange/user/'+data.userId, data,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}


export function postComment(feedItemId, author, comment, cb){
  sendXHR('POST','/postItem/'+feedItemId+'/commentThread/comment',{
    author:author,
    text:comment
  },(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}

export function postStatus(user, text, cb){
  sendXHR('POST', '/postItem', {
    userId:user,
    text:text
  }, (xhr)=>{
    cb(JSON.parse(xhr.responseText));
  });
}

export function createActivity(data,cb){
  var activityItem = {
    "type": data.type,
    "author":data.userData._id,
    "title": data.title,
    "description":data.description,
    "img":data.img === null ? "./img/HackUMass.jpg" : data.img,
    "startTime": moment(data.startTime).valueOf(),
    "endTime": moment(data.endTime).valueOf(),
    "location": data.location,
    "country": "USA",
    "state": "MA",
    "city": "Amherst",
    "participants": [],
    "likeCounter": [],
    "comments":[
    ],
    "contents": {
      "img": data.img === null ? "./img/HackUMass-detail-1.png":data.img,
      "text": data.detail
    }
  }
  activityItem = addDocument('activityItems',activityItem);

  var activities = readDocument('activities',data.userData.activity);
  activities.contents.unshift(activityItem._id);
  writeDocument('activities', activities);
  emulateServerReturn(activities,cb);
}


export function getPostFeedData(user, cb){
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/user/'+user+'/feed', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });

}

function getActivityFeedItemSync(activityId){
  var activityItem = readDocument('activityItems', activityId);
  activityItem.author = readDocument('users',activityItem.author);
  activityItem.participants = activityItem.participants.map((id)=>readDocument('users',id));
  activityItem.likeCounter = activityItem.likeCounter.map((id)=>readDocument('users',id));
  activityItem.comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });

  return activityItem;
}

export function getActivityFeedData(user,cb){
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/user/' + user + '/activity', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUserData(user,cb){
  sendXHR('GET','/user/'+user,undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}

export function getActivityDetail(id,cb){
  sendXHR('GET','/activityItem/'+id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function adpostComment(activityId, author, comment, cb){
  var activitydetailitem = readDocument('activityItems',activityId);
  activitydetailitem.comments.push({
    "author": author,
    "postDate": (new Date()).getTime(),
    "text": comment
  });

  writeDocument('activityItems',activitydetailitem);

  emulateServerReturn(getActivityFeedItemSync(activityId),cb);
}

export function getMessages(sessionid,cb){
  var message = readDocument('messageSession',sessionid);
  message.contents = message.contents.map(getMessageSync);

  emulateServerReturn(getMessageSync(sessionid).messages,cb);
}

export function postMessage(sessionId,sender,target, text, cb){
  var message = readDocument('message',sessionId);
  message.messages.push({
    "sender": sender,
    "target":target,
    "date":(new Date()).getTime(),
    "text": text
  });
  writeDocument('message',message);
  emulateServerReturn(getMessageSync(sessionId).messages,cb);
}

function getMessageSync(sessionId){
  var message = readDocument("message",sessionId);
  message.messages.forEach((message)=>{
    message.sender = readDocument('users', message.sender);
    message.target = readDocument('users', message.target);
  });
  return message;
}
