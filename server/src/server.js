// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
var bodyParser = require('body-parser');
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('../client/build'));

//import database functions
var database = require('./database.js');
var readDocument = database.readDocument;
// var addDocument = database.addDocument;
// var writeDocument = database.writeDocument;
// var deleteDocument = database.deleteDocument;

//get post feed data
function getPostFeedItemSync(feedItemId){
  var postFeedItem = readDocument("postFeedItems",feedItemId);
  postFeedItem.likeCounter = postFeedItem.likeCounter.map((id)=>readDocument('users', id));
  postFeedItem.contents.author = readDocument('users', postFeedItem.contents.author);

  postFeedItem.comments.forEach((comment)=>{
    comment.author = readDocument('users', comment.author);
  });

  return postFeedItem;
}

function getPostFeedData(user){
  var userData = readDocument('users',user);
  var feedData = readDocument('postFeeds',userData.post);
  feedData.contents = feedData.contents.map(getPostFeedItemSync);
  return feedData;
}

app.get('/user/:userId/feed',function(req,res){
  var userId = parseInt(req.params.userId,10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId === fromUser){
    res.send(getPostFeedData(userId));
  }
  else{
    res.status(401).end();
  }
});


/**
* Get the user ID from a token. Returns -1 (an invalid ID)
* if it fails.
*/
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
