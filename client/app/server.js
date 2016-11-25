import {readDocument, writeDocument, addDocument,deleteDocument} from './database.js';
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
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */
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
      AppError('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    AppError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    AppError('Could not ' + verb + " " + resource +
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
  var userData = readDocument('users',user);
  var notificationData = readDocument('notifications',userData.notification);
  var index = notificationData.contents.indexOf(id);
  if(index !== -1)
    notificationData.contents.splice(index,1);

  writeDocument("notifications",notificationData);
  deleteDocument("notificationItems",id);
  emulateServerReturn(notificationData,cb);
}

export function acceptRequest(id,user,cb){
  var userData = readDocument('users',user);
  var notificationItem = readDocument('notificationItems',id);
  userData.friends.push(notificationItem.sender);
  writeDocument("users",userData);
  deleteNotification(id,user,cb);
}

function getNotificationDataSync(notificationId){
  var notification = readDocument('notificationItems',notificationId);
  if(notification.type === "FR"){
    notification.sender = readDocument("users",notification.sender);
  }
  else{
    notification.author = readDocument("users",notification.author);
  }

  return notification;
}

export function getNotificationData(user, cb){
  var userData = readDocument('users',user);
  var notificationData = readDocument('notifications',userData.notification);
  notificationData.contents = notificationData.contents.map(getNotificationDataSync);

  emulateServerReturn(notificationData,cb);
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
  var activityItem = readDocument('activityItems', activityId);
  activityItem.likeCounter.push(user);

  writeDocument('activityItems', activityItem);

  emulateServerReturn(activityItem.likeCounter.map((id)=>readDocument('users',id)), cb);
}

export function unLikeActivity(activityId, user, cb){
  var activityItem = readDocument('activityItems', activityId);
  var userindex = activityItem.likeCounter.indexOf(user);

  if(userindex !== -1){
    activityItem.likeCounter.splice(userindex,1);
    writeDocument('activityItems', activityItem);
  }

  emulateServerReturn(activityItem.likeCounter.map((id)=>readDocument('users',id)), cb);
}

export function changeUserInfo(data, cb){
  var userData = readDocument('users',data.userData._id);
  userData.lastname = data.lastname;
  userData.firstname = data.firstname;
  userData.nickname = data.nickname;
  userData.description = data.description;
  userData.country = data.country;
  userData.state = data.state;
  userData.city = data.city;

  writeDocument('users', userData);

  emulateServerReturn(userData, cb);

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

function getPostFeedItemSync(feedItemId){
  var postFeedItem = readDocument("postFeedItems",feedItemId);
  postFeedItem.likeCounter = postFeedItem.likeCounter.map((id)=>readDocument('users', id));
  postFeedItem.contents.author = readDocument('users', postFeedItem.contents.author);

  postFeedItem.comments.forEach((comment)=>{
    comment.author = readDocument('users', comment.author);
  });

  return postFeedItem;
}


export function getPostFeedData(user, cb){
  // We don't need to send a body, so pass in 'undefined' for the body.
  sendXHR('GET', '/user/'+user+'/feed', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });

}

function getActivityFeedItemSync(feedItemId){
  var activityFeedItem = readDocument('activityItems',feedItemId);
  activityFeedItem.author = readDocument('users',activityFeedItem.author);
  activityFeedItem.participants = activityFeedItem.participants.map((id)=>readDocument('users',id));
  activityFeedItem.likeCounter = activityFeedItem.likeCounter.map((id)=>readDocument('users',id));
  activityFeedItem.comments.forEach((comment)=>{
    comment.author = readDocument('users',comment.author);
  });

  return activityFeedItem;
}

export function getActivityFeedData(user,cb){
  var userData = readDocument('users',user);
  var activityData = readDocument('activities',userData.activity);

  activityData.contents = activityData.contents.map(getActivityFeedItemSync);

  emulateServerReturn(activityData,cb);
}

export function getUserData(user,cb){
  sendXHR('GET','/user/'+user,undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}

export function getActivityDetail(id,cb){
  var activityData = getActivityFeedItemSync(id);
  emulateServerReturn(activityData,cb);
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
