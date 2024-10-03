import express from 'express'

const app=express()
const port= 3000

app.get('/',(req,res)=>{
    res.send("this works!");
})
app.listen(port,(req,res)=>{
    console.log("listening on ",port);
})