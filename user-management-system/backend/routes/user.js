const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');


router.post("/new-user", userController.postUser);

router.post('/user', userController.postLogin);

router.post('/search-user', userController.getUsers);


module.exports = router;