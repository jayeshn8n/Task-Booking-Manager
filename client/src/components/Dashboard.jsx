import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TaskList from './tasks/TaskList';
import BookingList from './bookings/BookingList';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('tasks');
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // FR-02 & FR-10: Get user data from localStorage stored during login
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('fullName');
        
        setUserRole(role || 'staff');
        setUserName(name || 'User');
    }, []);

    const isAdmin = userRole === 'admin';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Top Navigation Bar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                <aside className="w-64 bg-white shadow-lg z-10 border-r border-gray-200">
                    <div className="p-6 border-b border-gray-100">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Authenticated</p>
                        <h2 className="text-xl font-bold text-gray-800 truncate">{userName}</h2>
                        
                        {/* Role Badge */}
                        <span className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                            isAdmin 
                            ? 'bg-purple-50 text-purple-600 border-purple-100' 
                            : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                            {userRole} Account
                        </span>
                    </div>

                    <nav className="mt-6 px-3 space-y-2">
                        {/* Task Management Tab */}
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={`w-full text-left px-4 py-3 flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                                activeTab === 'tasks' 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 font-bold' 
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            <span className="text-lg">📋</span>
                            <span className="text-sm">Task Management</span>
                        </button>

                        {/* Room Bookings Tab - Now visible to both Admin and Staff */}
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full text-left px-4 py-3 flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                                activeTab === 'bookings' 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 font-bold' 
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            <span className="text-lg">📅</span>
                            <span className="text-sm">Room Bookings</span>
                        </button>
                    </nav>

                    {/* Footer hint in Sidebar */}
                    <div className="absolute bottom-10 left-6 text-[10px] text-gray-300">
                        v1.0.4 | MERN Challenge
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-10 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-10 flex justify-between items-end">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                                    {isAdmin ? 'Admin Control Center' : 'Staff Workspace'}
                                </h1>
                                <p className="text-gray-500 mt-2 font-medium">
                                    {activeTab === 'tasks' 
                                        ? 'Overview of facility maintenance and operational tasks.' 
                                        : 'Manage and view co-working space room reservations.'}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-gray-400 block uppercase">Current Portal</span>
                                <span className="text-sm font-bold text-blue-600">Regional Co-working Space</span>
                            </div>
                        </header>

                        {/* Component Rendering Area */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px]">
                            {activeTab === 'tasks' ? (
                                <TaskList
                                    userRole={userRole}
                                    userName={userName}
                                />
                            ) : (
                                <BookingList 
                                    userRole={userRole} 
                                    userName={userName} 
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;