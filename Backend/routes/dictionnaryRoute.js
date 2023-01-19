const express = require('express');
const router = express.Router();
const { findAlldictionnaries,numberOfHumansInDate,positionsOfHumans} = require('../controllers/dictionnaryController');

// all dictionnary's routes
// find all dictionnaries 
router.get('/findAlldictionnaries', findAlldictionnaries);
router.get('/numberOfHumansInDate', numberOfHumansInDate);
router.get('/positionsOfHumans', positionsOfHumans);
module.exports = router;
