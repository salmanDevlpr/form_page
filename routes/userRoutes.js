const express = require('express');
const router = express.Router();
const { getAllUser , getUserById, createAppointment,allUser } = require('../controllers/checkAppointmentController')
const { sendMailToUser } = require('../controllers/sendEmailController');
const { registerController, loginController, getLoginUsers } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/appointment/:appointmetDate', getAllUser);


router.get('/:id', getUserById);
router.get('/auth/user', getLoginUsers);

router.post('/sendMail', sendMailToUser);

router.post('/bookAppointment', createAppointment);


router.post('/register', registerController);

router.post('/login', loginController);


// router.post('/getUserData', authMiddleware, authController)

module.exports = router;