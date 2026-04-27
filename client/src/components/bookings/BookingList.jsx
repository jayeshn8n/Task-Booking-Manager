import React, { useEffect, useState } from 'react';
import API from '../../api';
import AddBooking from './AddBooking';
import BookingItem from './BookingItem';

const BookingList = ({ userRole, userName }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = userRole === 'admin';

    const fetchBookings = async () => {
        try {
            const { data } = await API.get('/bookings');
            setBookings(data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    useEffect(() => { fetchBookings(); }, []);

    // LOGIC: If Staff, show ONLY bookings made for them by the Admin
    const displayedBookings = isAdmin 
        ? bookings 
        : bookings.filter(b => b.bookedBy?.toLowerCase() === userName?.toLowerCase());

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* ONLY Admin can see the New Room Reservation form */}
            {isAdmin ? (
                <AddBooking onBookingAdded={fetchBookings} />
            ) : (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded shadow-sm">
                    <p className="text-amber-800 text-sm font-medium">
                        🛡️ <strong>Restricted Access:</strong> Staff members cannot reserve rooms. Please contact the Admin for room assignments.
                    </p>
                </div>
            )}

            <div className="flex justify-between items-center border-b pb-4 mt-8">
                <h3 className="text-xl font-bold text-gray-800">
                    {isAdmin ? "Global Room Reservations" : "My Room Assignments"}
                </h3>
            </div>

            <div className="space-y-4">
                {displayedBookings.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
                        <p className="text-gray-400">No rooms currently reserved for you.</p>
                    </div>
                ) : (
                    displayedBookings.map(booking => (
                        <BookingItem 
                            key={booking._id} 
                            booking={booking} 
                            // Only allow deletion if Admin
                            onDelete={isAdmin ? (id) => API.delete(`/bookings/${id}`).then(fetchBookings) : null} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingList;