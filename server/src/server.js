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
var addDocument = database.addDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

//schemas
var statusUpdateSchema = require('./schemas/statusUpdate.json');
var commentSchema = require('./schemas/comment.json');
var userInfoSchema = require('./schemas/userInfo.json');
var validate = require('express-jsonschema').validate;


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

    res.send(getPostFeedData(userId));

});

function postStatus(user, text){
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

  return post;
}

//create post
app.post('/postItem', validate({ body: statusUpdateSchema }),function(req,res){
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === body.userId){
    var newPost = postStatus(body.userId,body.text);
    res.status(201);
    res.send(newPost);
  }
  else{
    res.status(401).end();
  }
});

//like post
app.put('/postItem/:postItemId/likelist/:userId',function(req,res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var postItemId = parseInt(req.params.postItemId,10);
  var userId = parseInt(req.params.userId,10);
  if(userId === fromUser){
    var postFeedItem = readDocument('postFeedItems',postItemId);
    if(postFeedItem.likeCounter.indexOf(userId)===-1){
      postFeedItem.likeCounter.push(userId);
      writeDocument('postFeedItems',postFeedItem);
    }
    res.status(201);
    res.send(postFeedItem.likeCounter.map((id)=>readDocument('users',id)));
  }
  else{
    res.status(401).end();
  }
});

//unlike post
app.delete('/postItem/:postItemId/likelist/:userId',function(req,res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var postItemId = parseInt(req.params.postItemId,10);
  var userId = parseInt(req.params.userId,10);
  if(userId === fromUser){
    var postFeedItem = readDocument('postFeedItems',postItemId);
    var index = postFeedItem.likeCounter.indexOf(userId);
    if(index!==-1){
      postFeedItem.likeCounter.splice(index,1);
      writeDocument('postFeedItems',postFeedItem);
    }
    res.status(201);
    res.send(postFeedItem.likeCounter.map((id)=>readDocument('users',id)));
  }
  else{
    res.status(401).end();
  }

});

//get user data
app.get('/user/:userId',function(req,res){
  var userId = parseInt(req.params.userId,10);
  var userData = readDocument('users',userId);
  userData.friends = userData.friends.map((id)=>readDocument('users',id));
  res.status(201);
  res.send(userData);
});

//post comments
app.post('/postItem/:postItemId/commentThread/comment',validate({body:commentSchema}),
function(req,res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;
  var postItemId = parseInt(req.params.postItemId);
  var userId = body.author;
  if(fromUser === userId){
    var postFeedItem = readDocument('postFeedItems',postItemId);
    postFeedItem.comments.push({
      "author": userId,
      "text": body.text,
      "postDate": (new Date()).getTime()
    });
    writeDocument('postFeedItems',postFeedItem);
    res.status(201);
    res.send(getPostFeedItemSync(postItemId));
  }
  else{
    res.status(401).end();
  }
});

//change user info
app.put('/settings/user/:userId',validate({body:userInfoSchema}),function(req,res){
  var data = req.body;
  var moment = require('moment');
  var userId = parseInt(req.params.userId);
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  if(fromUser == userId){
    var userData = readDocument('users',userId);
    userData.lastname = data.lastname;
    userData.firstname = data.firstname;
    userData.nickname = data.nickname;
    userData.description = data.description;
    userData.location = data.location;
    userData.birthday = moment(data.birthday).valueOf();

    writeDocument('users', userData);
    res.status(201);
    res.send(userData);
  }
  else{
    res.status(401).end();
  }
});

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

function getActivityFeedData(user){
  var userData = readDocument('users',user);
  var activityData = readDocument('activities',userData.activity);

  activityData.contents = activityData.contents.map(getActivityFeedItemSync);

  return activityData;
}

// get activity Feed data
app.get('/user/:userid/activity', function(req, res) {
  var userId = parseInt(req.params.userId,10);
  res.send(getActivityFeedData(userId));
});

//like activity
app.put('/activityItem/:activityId/likelist/:userId',function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var activityId = parseInt(req.params.activityId, 10);
  var userId = parseInt(req.params.userId, 10);
  if(userId === fromUser){
    var activityItem = readDocument('activityItems', activityId);
    if(activityItem.likeCounter.indexOf(userId) === -1){
      activityItem.likeCounter.push(userId);
      writeDocument('activityItems', activityItem);
    }
    res.status(201);
    res.send(activityItem.likeCounter.map((id) => readDocument('users', id)));
  }
  else{
    res.status(401).end();
  }
});

//unlike activity
app.delete('/activityItem/:activityId/likelist/:userId', function(req, res){
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var activityId = parseInt(req.params.activityId, 10);
  var userId = parseInt(req.params.userId, 10);
  if(userId === fromUser){
    var activityItem = readDocument('activityItems', activityId);
    var index = activityItem.likeCounter.indexOf(userId);
    if(index !== -1){
      activityItem.likeCounter.splice(index, 1);
      writeDocument('activityItems', activityItem);
    }
    res.status(201);
    res.send(activityItem.likeCounter.map((id) => readDocument('users', id)));
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


// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

/**
* Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
