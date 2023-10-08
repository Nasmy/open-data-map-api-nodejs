const router = require('express').Router();
const electionController = require('../controller/election');
const validation = require('../middlewares/validation');

// Retrieve Elections 
router.get('/', electionController.getAllElections);

// Retrieve Results 
router.route('/rounds').get(validation.validateCustomElectionRound, electionController.getAllRoundsById);

router.route('/results').get(validation.validateCustomElection, electionController.getResults);

module.exports = router; 