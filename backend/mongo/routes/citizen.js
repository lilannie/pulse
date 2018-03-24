const Citizen = require('../controllers/citizen');
const express = require('express');
const router = express.Router();

// GET /citizens
router.get('/', Citizen.findAll);

// POST /citizens
router.post('/', Citizen.create);

module.exports = router;
