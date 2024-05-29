const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers); // get users
router.post('/', userController.createUser); // create a user
router.put('/', userController.updateUser); // update a user
router.delete('/', userController.deleteUser); // delete a user

module.exports = router;