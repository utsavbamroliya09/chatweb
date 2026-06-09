const { createloginUser, fetchUser } = require('../controller/login.controller');
const { sendMessage, getMessage } = require('../controller/message.controller');
const { createsignUser } = require('../controller/sign.controller');

const route = require('express').Router()


// signUser
route.post('/sign', createsignUser)

// login
route.post('/login', createloginUser)
route.get('/login', fetchUser);


// msg
route.post("/message",sendMessage)
route.get("/message/:senderId/:receiverId", getMessage)


module.exports = route;


