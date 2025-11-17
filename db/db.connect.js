const mongoose = require("mongoose")
require("dotenv").config()
const mongo_URI = process.env.MONGODB
async function initializeDatabase(){
    await mongoose.connect(mongo_URI)
    .then(()=>console.log("Connected to db successfully."))
    .catch((err)=>console.log("Error while connecting to db."))
}
module.exports={initializeDatabase}