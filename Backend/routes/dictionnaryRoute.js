const express = require('express');
const router = express.Router();
const { findAlldictionnaries,findOnedictionnary } = require('../controllers/dictionnaryController');

// all dictionnary's routes
//get dictionnary by id
router.get('/getOneNotification/:id', findOnedictionnary);
// find all dictionnaries 
router.get('/findAlldictionnaries', findAlldictionnaries);
module.exports = router;
