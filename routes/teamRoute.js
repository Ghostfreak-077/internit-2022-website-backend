const express = require('express');
const { isAuthenticatedUser } = require('../controllers/admin');
const router = express.Router();
const { getAllTeams, createTeam, getTeamDetails, updateTeam, deleteTeam } = require('../controllers/teamController');


router.route("/teams").get(getAllTeams);
router.route("/team/new").post(isAuthenticatedUser,createTeam);
router.route("/team/:id").get(getTeamDetails).put(isAuthenticatedUser,updateTeam).delete(isAuthenticatedUser,deleteTeam)


module.exports = router;