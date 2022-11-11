const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, "Please Enter team Name"],
        trim: true,
    },
    teamId: {
        type: Number,
        required: [true, "Please Enter Id of team"],
    },
    badmintonPlayed: {
        type: Number,
        required: [true, "Please Enter Game played by team"],
    },
    ttPlayed: {
        type: Number,
        required: [true, "Please Enter Game played by team"],
    },
    chessPlayed: {
        type: Number,
        required: [true, "Please Enter Game played by team"],
    },
    badmintonWins: {
        type: Number,
        required: [true, "Please Enter wins of team"],
    },
    ttWins: {
        type: Number,
        required: [true, "Please Enter wins of team"],
    },
    chessWins: {
        type: Number,
        required: [true, "Please Enter wins of team"],
    },
    gold: {
        type: Number,
        required: [true, "Please Enter number of gold"],
    },
    silver: {
        type: Number,
        required: [true, "Please Enter number of silver"],
    },
    bronze: {
        type: Number,
        required: [true, "Please Enter number of bronze"],
    }
})

module.exports=mongoose.model("Team",teamSchema);