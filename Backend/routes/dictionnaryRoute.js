const express = require('express');
const router = express.Router();
const { findAlldictionnaries,getDataByTime} = require('../controllers/dictionnaryController');

// all dictionnary's routes
// find all dictionnaries 
router.get('/findAlldictionnaries', findAlldictionnaries);

router.get('/getDataByTime', getDataByTime);
module.exports = router;
