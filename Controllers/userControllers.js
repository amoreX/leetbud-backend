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
            //Authenticate user_pass
            const isMatch = await bcrypt.compare(password,checkingUser.password);
            if (isMatch){
                return res.status(400).send('User Authenticated')
            }
            else{
                return res.status(400).send('Invalid password')
            }
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