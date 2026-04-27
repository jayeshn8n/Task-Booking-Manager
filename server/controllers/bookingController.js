const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');

// FR-07: Create Booking
exports.createBooking = async (req, res, next) => {
    // 1. Check for express-validator errors (Body validation)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { roomName, bookedBy, date, startTime, endTime, purpose } = req.body;

    // 2. FR-07 Logic: End Time must be after Start Time
    // This is a business logic requirement
    if (endTime <= startTime) {
        return res.status(400).json({ message: "End Time must be after Start Time" });
    }

    try {
        // 3. Create instance using req.user.id from Auth Middleware
        const booking = new Booking({
            roomName,
            bookedBy,
            date,
            startTime,
            endTime,
            purpose,
            createdBy: req.user.id 
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        // 4. Pass errors to errorMiddleware (Avoids 500 crashes)
        next(err);
    }
};

// FR-08: View All Bookings (Sorted by Date then Start Time)
exports.getBookings = async (req, res, next) => {
    try {
        // find all and sort: date ascending (1), then startTime ascending (1)
        const bookings = await Booking.find().sort({ date: 1, startTime: 1 });
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

// FR-09: Delete Booking
exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        // Check if booking exists
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        next(err);
    }
};