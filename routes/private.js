const express = require('express');
const router =  express.Router();
const {getPrivateData} = require('../controllers/private')
const {protect} = require('../middleware/auth');
// controller is reposnsible for functionally of the routes

router.route('/').get(protect, getPrivateData);

module.exports = router;