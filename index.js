const mongoose = require("mongoose") 

const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
require("dotenv").config()

const Meetup = require("./models/meetup.models.js")
const {initializeDatabase} = require("./db/db.connect.js")
initializeDatabase()

async function addMeetup(meetupbody){
    try{
        const theMeetUp =  new Meetup(meetupbody)
        const theMeetUp2 = await theMeetUp.save()
        return theMeetUp2
    }catch(err){
        console.log(err)
    }
}
app.post("/meetups", async(req, res)=>{
    try{
        const newlyAddedMeetup = await addMeetup(req.body)
        if(newlyAddedMeetup) res.status(200).json({message:"Meetup added successfully.", meetup: newlyAddedMeetup})
        else res.status(400).json({message: "some error while adding meetup"})
    }catch(err){
        res.status(404).json({error: err})
    }
})
async function readMeetups(){
    try{
        const allmeetups = await Meetup.find()
        return allmeetups
    }catch(err){
        console.log(err)
    }
}
app.get("/meetups", async(req, res)=>{
    try{
        const allthemeetups = await readMeetups()
        if(allthemeetups.length!==0) res.status(200).json({message:"Meetups read successfully.", meetups: allthemeetups})
        else res.status(400).json({message: "some error while adding meetup"})
    }catch(err){
        res.status(404).json({error: err})
    }
})

async function getMeetById(theId){
    try{
        const ourMeet = await Meetup.findById(theId)
        return ourMeet
    }catch(err){
        throw err
    }
}
app.get("/meetups/:id", async(req,res)=>{
    try{
        const theMeet = await getMeetById(req.params.id)
        console.log(theMeet)
        if(theMeet)res.status(200).json({message:"Meetup read successfully.", ourmeet: theMeet})
        else res.status(400).json({message: "some error while reading meetup"})
    }catch(err){
        res.status(404).json({error: err})
    }
})

async function getMeetByTitle(theTitle){
    try{
        const ourMeet = await Meetup.findOne({title: theTitle})
        return ourMeet
    }catch(err){
        throw err
    }
}
app.get("/meetups/:title", async(req,res)=>{
    try{
        const theMeet = await getMeetByTitle(req.params.title)
        if(theMeet)res.status(200).json({message:"Meetup read successfully.", ourmeet: theMeet})
        else res.status(400).json({message: "some error while reading meetup"})
    }catch(err){
        res.status(404).json({error: err})
    }
})

async function deleteMeetById(meetId){
    try{
        const deletedMeet = await Meetup.findByIdAndDelete(meetId)
        return deletedMeet
    }catch(err){
        throw err
    }
}
app.delete("/meetups/:meetid", async(req,res)=>{
    try{
        const deletedMeet2 = await deleteMeetById(req.params.meetid)
        if(deletedMeet2)res.status(200).json({message:"Meetups deleted successfully.", deletedmeet: deletedMeet2})
        else res.status(400).json({message: "some error while deleting meetup."})
    }catch(err){
        res.status(404).json({error: err})
    }
})

const PORT = process.env.PORT || 3093
app.listen(PORT, ()=> console.log("Server is running on port", PORT))