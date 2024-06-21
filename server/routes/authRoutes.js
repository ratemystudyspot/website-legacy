const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/refresh-token', authController.handleRefreshToken);
router.post('/send-recovery-email', authController.sendRecoveryEmail);
router.put('/reset-password', authController.resetPassword);

module.exports = router;