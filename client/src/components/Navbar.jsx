import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // FR-10: Logout logic
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear JWT
        navigate('/login'); // Redirect to login
    };

    return (
        <nav className="bg-blue-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏢</span>
                        <h1 className="text-xl font-bold tracking-tight">TaskBooking Manager</h1>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;