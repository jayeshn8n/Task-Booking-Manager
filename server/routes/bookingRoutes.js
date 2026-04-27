const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); // Import this!
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/', [auth, [
    check('roomName', 'Room Name is required').notEmpty(),
    check('bookedBy', 'Booked By is required').notEmpty(),
    check('date', 'Valid date is required').isISO8601(),
    check('purpose', 'Purpose must be at least 5 chars').isLength({ min: 5 })
]], bookingController.createBooking);

router.get('/', auth, bookingController.getBookings);
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router;