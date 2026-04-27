import React, { useState, useEffect } from 'react';
import API from '../../api';

const AddBooking = ({ onBookingAdded }) => {
    const [formData, setFormData] = useState({
        roomName: '', bookedBy: '', date: '', startTime: '', endTime: '', purpose: ''
    });
    const [error, setError] = useState(''); // State for the popup error
    const [success, setSuccess] = useState(false); // State for success feedback

    // Auto-hide error after 4 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        
        // FR-07: Validation - End Time > Start Time
        if (formData.endTime <= formData.startTime) {
            setError("Validation Failed: End Time must be strictly after Start Time.");
            return;
        }

        try {
            await API.post('/bookings', formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            onBookingAdded(); // Refresh list
            setFormData({ roomName: '', bookedBy: '', date: '', startTime: '', endTime: '', purpose: '' });
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed. Please try again.");
        }
    };

    return (
        <div className="relative">
            {/* GOOD POPUP UI: Error Message */}
            {error && (
                <div className="absolute -top-12 left-0 right-0 animate-bounce">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold flex items-center justify-center space-x-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="absolute -top-12 left-0 right-0">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold flex items-center justify-center space-x-2">
                        <span>✅</span>
                        <span>Booking Confirmed Successfully!</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm transition-all">
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl">📅</span>
                    <h3 className="text-lg font-bold text-blue-900">New Room Reservation</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">Room Name</label>
                        <input type="text" placeholder="e.g. Conference A" className="w-full p-2.5 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" value={formData.roomName} onChange={e => setFormData({...formData, roomName: e.target.value})} required />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">Booked For</label>
                        <input type="text" placeholder="Staff Name" className="w-full p-2.5 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" value={formData.bookedBy} onChange={e => setFormData({...formData, bookedBy: e.target.value})} required />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">Date</label>
                        <input type="date" className="w-full p-2.5 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">Start Time</label>
                        <input type="time" className="w-full p-2.5 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 font-medium" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} required />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">End Time</label>
                        <input type="time" className={`w-full p-2.5 border rounded-xl outline-none focus:ring-2 font-medium ${error ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-blue-200 focus:ring-blue-400'}`} value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} required />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-blue-400 ml-1">Purpose</label>
                        <input type="text" placeholder="Brief Description" className="w-full p-2.5 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-400" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} required />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 transition-all active:scale-95">
                        Confirm Reservation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBooking;