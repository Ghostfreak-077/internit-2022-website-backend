const express = require('express');
const { isAuthenticatedUser } = require('../controllers/admin');
const router = express.Router();
const { getAllMatchs, createMatch, getMatchDetails, updateMatch, deleteMatch } = require('../controllers/matchController');


router.route("/matchs").get(getAllMatchs);
router.route("/match/new").post(isAuthenticatedUser,createMatch);
router.route("/match/:id").get(getMatchDetails).put(isAuthenticatedUser,updateMatch).delete(isAuthenticatedUser,deleteMatch)


module.exports = router;