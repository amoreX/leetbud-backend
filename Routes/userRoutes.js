const express = require('express')
const userRoutes = express.Router()
const userController = require('../Controllers/userControllers')

// Route to register new user
userRoutes.post('/register', userController.register)

module.exports = userRoutes