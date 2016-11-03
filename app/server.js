import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

function getPostFeedItemSync(feedItemId){
  var postFeedItem = readDocument("postFeedItems",feedItemId);
  postFeedItem.likeCounter = postFeedItem.likeCounter.map((id)=>readDocument('users', id));
  postFeedItem.contents.author = readDocument('user', postFeedItem.contents.author);

  postFeedItem.comments.forEach((comment)=>{
    comment.author = readDocument('user', comment.author);
  });

  return postFeedItem;
}


function getPostFeedData(user, cb){
  var userData = readDocument('users',user);
  var feedData = readDocument('postFeeds',userData.post);

  feedData.contents.map(getPostFeedItemSync);

  emulateServerReturn(feedData,cb);
}

export function getUserData(user,cb){
  var userData = readDocument('users',user);
  emulateServerReturn(userData,cb);
}
