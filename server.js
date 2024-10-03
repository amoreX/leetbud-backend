const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

// VARIABLES
const app = express()
const port = process.env.PORT
const dbURL = process.env.DB_URL 

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// DATABASE CONNECTION FUNCTION
const connectDB = async () => {
    try {
      await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database Connected');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
}

// SERVER LISTENING FUNCTION
app.listen(port, async() => {
    try{
        await connectDB()
        console.log(`Server listening on port ${port}`)
    }
    catch(err) {
        console.error(err)
    }
})