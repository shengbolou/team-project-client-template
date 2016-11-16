import {readDocument, writeDocument, addDocument,deleteDocument} from './database.js';
var moment = require('moment');

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
  var postFeedItem = readDocument('postFeedItems',feedItemId);
  postFeedItem.likeCounter.push(user);

  writeDocument('postFeedItems',postFeedItem);

  emulateServerReturn(postFeedItem.likeCounter.map((id)=>readDocument('users',id)), cb);
}

export function unLikePost(feedItemId, user, cb){
  var postFeedItem = readDocument('postFeedItems',feedItemId);
  var userindex = postFeedItem.likeCounter.indexOf(user);

  if(userindex !== -1){
    postFeedItem.likeCounter.splice(userindex,1);
    writeDocument('postFeedItems', postFeedItem);
  }

  emulateServerReturn(postFeedItem.likeCounter.map((id)=>readDocument('users',id)), cb);
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

export function changeUserInfo(user, lastname, firstname, nickname, discription, country, state, city, cb){
  var userData = readDocument('users', user);
  userData.lastname = lastname;
  userData.firstname = firstname;
  userData.nickname = nickname;
  userData.discription = discription;
  userData.country = country;
  userData.state = state;
  userData.city = city;

  writeDocument('users', userData);

  emulateServerReturn(userData, cb);

}


export function postComment(feedItemId, author, comment, cb){
  var postFeedItem = readDocument('postFeedItems',feedItemId);
  postFeedItem.comments.push({
    "author": author,
    "text": comment,
    "postDate": (new Date()).getTime()
  });

  writeDocument('postFeedItems',postFeedItem);

  emulateServerReturn(getPostFeedItemSync(feedItemId),cb);
}

export function postStatus(user, text, cb){
  var time = new Date().getTime();

  var post = {
    "likeCounter":[],
    "type": "general",
    "contents": {
      "author": user,
      "postDate": time,
      "text": text,
      "img": null
    },
    "comments":[]
  };

  post = addDocument('postFeedItems',post);

  var userData = readDocument('users',user);
  var postFeedData = readDocument('postFeeds',userData.post);

  postFeedData.contents.unshift(post._id);

  writeDocument('postFeeds', postFeedData);

  emulateServerReturn(post,cb);
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
  var userData = readDocument('users',user);
  var feedData = readDocument('postFeeds',userData.post);

  feedData.contents = feedData.contents.map(getPostFeedItemSync);

  emulateServerReturn(feedData,cb);
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
  var userData = readDocument('users',user);
  userData.friends = userData.friends.map((id)=>readDocument('users',id));
  emulateServerReturn(userData,cb);
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
