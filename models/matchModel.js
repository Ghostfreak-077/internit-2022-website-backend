const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: [true, "Please Enter team 1 Name"],
        trim: true,
    },
    team2: {
        type: String,
        required: [true, "Please Enter team 2 Name"],
        trim: true,
    },
    completed: {
        type: String,
        required: [true, "Please Enter if its completed"]
    },
    game:{
        type: String,
        required: [true, "Please Enter the game"],
    },
    matchType: {
        type: String,
        required: [true, "Please Enter type of match"],
    },
    team1Point: {
        type: Number,
        required: [false, "Please Enter team 1 points"],
    },
    team2Point: {
        type: Number,
        required: [false, "Please Enter team 2 points"],
    }
})

module.exports=mongoose.model("Match",matchSchema);