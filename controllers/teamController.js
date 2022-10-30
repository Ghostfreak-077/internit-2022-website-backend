const Team = require("../models/teamModel"); //schema

//create Team
exports.createTeam = async (req, res, next) => {
    try {
        const team = await Team.create(req.body);
        res.status(201).json({
            success: true,
            team
        })
    } catch (err) {
        res.send(err.message);
    }
}

//update Team
exports.updateTeam = async (req, res, next) => {
    try {
        let team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(500).json({
                success: false,
                message: "Team not found"
            })
        }
        team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            team
        })
    } catch (err) {
        res.send(err.message);
    }
}

//Delete Team
exports.deleteTeam = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(500).json({
                success: false,
                message: "Team not found"
            })
        }

        await team.remove();

        res.status(200).json({
            success: true,
            message: "Team deleted"
        })
    } catch (err) {
        res.send(err.message);
    }
}


//Get one Team Detail
exports.getTeamDetails = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            })
        }

        res.status(200).json({
            success: true,
            team,
        })
    } catch (err) {
        res.send(err.message);
    }
}


//get all Team
exports.getAllTeams = async (req, res) => {
    try {
        const teamsCount = await Team.countDocuments();
        const teams = await Team.find();
        res.status(201).json({
            success: true,
            teams,
            teamsCount,
        })
    } catch (err) {
        res.send(err.message);
    }
}
