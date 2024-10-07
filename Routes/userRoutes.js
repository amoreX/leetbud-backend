const express = require('express')
const userRoutes = express.Router()
const userController = require('../Controllers/userControllers')

// Route to register new user
userRoutes.post('/register', userController.register)

// Route ot add friends 
userRoutes.post('/add', userController.addFriends)

module.exports = userRoutes