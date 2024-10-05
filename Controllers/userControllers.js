const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')

// Controller to register new users
const register = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try{
        // Checking if user already exists
        const checkingUser = await userModel.findOne({ email: email })
        if (checkingUser) {
            return res.status(400).send('User Already Exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userInfo = {
            email: email,
            password: hashedPassword
        }

        const newUser = new userModel(userInfo)

        await newUser.save()

        res.status(200).json({
            Message: 'User Created Successfully',
            userId: newUser._id
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = { register }