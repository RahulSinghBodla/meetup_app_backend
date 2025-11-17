const mongoose = require("mongoose")
const MeetupSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    additionalInfo: {
        age: {type: Number},
        dress: {type: String}
    },
    eventtype: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    eventtags: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    speakers: [
        {
            name: {type: String},
            photo: {type: String},
            designation: {type: String}
        }
    ]
})
const Meetup = new mongoose.model("Meetup", MeetupSchema)
module.exports=Meetup