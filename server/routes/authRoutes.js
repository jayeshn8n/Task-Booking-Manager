const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//    POST /api/auth/register
//     Register staff member
router.post(
    '/register',
    [
        check('fullName', 'Full Name is required (min 2 chars)').isLength({ min: 2 }),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 8+ chars, with 1 uppercase and 1 digit')
            .isLength({ min: 8 })
            .matches(/^(?=.*[A-Z])(?=.*\d)/),
        check('role', 'Role must be admin or staff').isIn(['admin', 'staff'])
    ],
    authController.register
);

//    POST /api/auth/login
//     Authenticate staff & get token
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    authController.login
);

module.exports = router;