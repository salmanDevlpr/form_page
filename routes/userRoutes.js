const express = require('express');
const router = express.Router();
const { getAllUser , getUserById, createUser } = require('../controllers/userController')

router.get('/:appointmetDate', getAllUser);

router.get('/:id', getUserById)

router.post('/', createUser)

module.exports = router;