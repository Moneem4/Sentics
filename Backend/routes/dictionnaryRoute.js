const express = require('express');
const router = express.Router();
const { getNumberOfHumansByTime,getPositionsByTime} = require('../controllers/dictionnaryController');

// all dictionnary's routes

router.get('/getNumberOfHumansByTime', getNumberOfHumansByTime);
router.get('/getPositionsByTime', getPositionsByTime);
module.exports = router;
