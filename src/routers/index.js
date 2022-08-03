const express = require('express');
const {getUsers, getUser, addUser} = require('../controllers/user.js');
const {login} = require('../controllers/auth.js');
const auth = require('../middlewares/auth.js');

const router = express.Router();

router.post('/login', login);

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUser);
router.post('/users', auth, addUser);

module.exports = router;