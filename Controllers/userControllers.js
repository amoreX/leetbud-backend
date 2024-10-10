const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')

// Controller to register/Login new users
const register = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try{
        // Checking if user already exists
        const checkingUser = await userModel.findOne({ email: email })
        if (checkingUser) {
            //Authenticate user_pass
            const isMatch = await bcrypt.compare(password,checkingUser.password);
            if (isMatch){
                // return res.status(400).send('User Authenticated')
                res.status(200).json({
                    Message: 'User Authenticated Successfully',
                    userId: checkingUser._id,
                    authStatus: "True"
                })
            }
            else{
                res.status(200).json({
                    Message: 'Invalid password',
                    authStatus: "False"
                })
            }
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userInfo = {
            username: '',
            email: email,
            password: hashedPassword,
            friends: []
        }

        const newUser = new userModel(userInfo)

        await newUser.save()

        res.status(200).json({
            Message: 'User Created Successfully',
            userId: newUser._id,
            authStatus: "True"
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

// Controller to add friends 
const addFriends = asyncHandler(async(req, res) => {
    const { friendId, userId } = req.body

    try{
        const data = userModel.updateOne(
            { _id: userId },
            { $push: { friends: friendId }}
        )

        if (!data) return res.status(404).send('Something went wrong');

        res.status(200).send('Success')
    }
    catch(err) {
        console.log(err)
        req.status(500).send('Internal Server Error')
    }
})

module.exports = { register, addFriends }