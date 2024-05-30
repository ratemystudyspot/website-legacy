const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/send-recovery-email', authController.sendRecoveryEmail);
router.put('/reset-password', authController.resetPassword);

module.exports = router;