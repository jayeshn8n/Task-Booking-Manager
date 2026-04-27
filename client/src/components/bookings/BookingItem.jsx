
const BookingItem = ({ booking, onDelete }) => {
    return (
        <div className="bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div>
                <h4 className="font-bold text-blue-900 text-lg">{booking.roomName}</h4>
                <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-1">
                    <p>👤 <span className="font-medium">{booking.bookedBy}</span></p>
                    <p>📅 {new Date(booking.date).toLocaleDateString()}</p>
                    <p>🕒 {booking.startTime} - {booking.endTime}</p>
                    <p>🎯 {booking.purpose}</p>
                </div>
            </div>
            <button 
                onClick={() => onDelete(booking._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-full transition-colors"
                title="Delete Booking"
            >
                🗑️
            </button>
        </div>
    );
};

export default BookingItem;