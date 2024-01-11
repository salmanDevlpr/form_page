const express = require('express');
const router = express.Router();
const { getAllUser , getUserById } = require('../controllers/checkAppointmentController')
const { createUser } = require('../controllers/sendEmailController')

router.get('/:appointmetDate', getAllUser);

router.get('/:id', getUserById)

router.post('/sendMail', createUser)

module.exports = router;