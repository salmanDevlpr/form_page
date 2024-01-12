const express = require('express');
const router = express.Router();
const { getAllUser , getUserById, createAppointment } = require('../controllers/checkAppointmentController')
const { sendMailToUser } = require('../controllers/sendEmailController')

router.get('/:appointmetDate', getAllUser);

router.get('/:id', getUserById)

router.post('/sendMail', sendMailToUser)

router.post('/bookAppointment', createAppointment)

module.exports = router;