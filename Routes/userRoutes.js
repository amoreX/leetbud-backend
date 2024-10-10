const express = require('express')
const userRoutes = express.Router()
const userController = require('../Controllers/userControllers')

// Route to register new user
userRoutes.post('/register', userController.register)

// Route ot add friends 
userRoutes.post('/add', userController.addFriends)

//Route to get friends
userRoutes.post('/friends',userController.getFriends)
module.exports = userRoutes