const Match = require("../models/matchModel"); //schema
const Team = require("../models/teamModel"); //schema

//create match
exports.createMatch = async (req, res, next) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json({
            success: true,
            match
        })
    } catch (err) {
        res.send(err.message);
    }
}

//update match
exports.updateMatch = async (req, res, next) => {
    try {
        let match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(500).json({
                success: false,
                message: "match not found"
            })
        }
        match = await Match.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        if (req.body.team1Point + req.body.team2Point == 3) {
            let team1 = await Team.findOne({ teamName: match.team1 });
            let team2 = await Team.findOne({ teamName: match.team2 });
        
            if (req.body.team1Point < req.body.team2Point) {
                [team1,team2]=[team2,team1];
            }
            await Team.findOneAndUpdate({ teamName: team1.teamName }, { wins: team1.wins + 1, gamePlayed: team1.gamePlayed + 1 }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            await Team.findOneAndUpdate({ teamName: team2.teamName }, { gamePlayed: team2.gamePlayed + 1 }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

        }
        res.status(200).json({
            success: true,
            match
        })
    } catch (err) {
        res.send(err.message);
    }
}

//Delete match
exports.deleteMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(500).json({
                success: false,
                message: "match not found"
            })
        }

        await match.remove();

        res.status(200).json({
            success: true,
            message: "match deleted"
        })
    } catch (err) {
        res.send(err.message);
    }
}


//Get one match Detail
exports.getMatchDetails = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "match not found"
            })
        }

        res.status(200).json({
            success: true,
            match,
        })
    } catch (err) {
        res.send(err.message);
    }
}


//get all match
exports.getAllMatchs = async (req, res) => {
    try {
        const matchsCount = await Match.countDocuments();
        const matchs = await Match.find();
        res.status(201).json({
            success: true,
            matchs,
            matchsCount,
        })
    } catch (err) {
        res.send(err.message);
    }
}
