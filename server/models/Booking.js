
// models/Booking.js
const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    roomName: { type: String, required: true, trim: true },
    bookedBy: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    purpose: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);