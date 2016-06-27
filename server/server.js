"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const auth = require('./utils/auth_utils.js')
const messaging = require('./utils/message_utils.js');
const favmedia = require('./utils/favmedia_utils.js');
const games = require('./utils/game_utils.js');
const social = require('./utils/social_utils.js');
const user = require('./utils/user_utils.js');

const server = require('http').Server(app);
const io = require('socket.io')(server);
//server.listen(80);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../dist/')));

app.post('/signup', auth.authFunc);

app.post('/get_user_info', user.userInfo);
app.post('/post_profile', user.editProfile);

app.post('/favmedia', favmedia.getFavmedia);

app.post('/games', games.newGame);
app.post('/fetch_games', games.fetchGames);

app.post('/get_users', social.fetchUsers);
app.post("/show_friends", social.showFriends);
app.post('/get_friend_info', social.friendInfo);
app.post('/add_friend', social.addFriend);

app.post('/send_message', messaging.sendMessage);
app.post('/fetch_messages', messaging.fetchMessages);
app.post('/create_namespace', messaging.createNamespace);

app.post('/get_messages', function(req, res) {
  console.log('This is the req', req.body);

  let kylemike = io.of('/kyle');

kylemike.on('connection', function (socket) {
  console.log("Houston, we have connected");

  socket.on('message', function (msg) {

   socket.emit('message', "Original msg:" + msg + "This is from the server");
})
});

});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 8000);

console.log("Listening on port 8000");

module.exports = app;
