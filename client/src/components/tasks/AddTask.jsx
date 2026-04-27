import React, { useState, useEffect } from 'react';
import API from '../../api';

const AddTask = ({ onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '', description: '', priority: 'Low', dueDate: '', assignedTo: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Auto-hide error popup after 4 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const validate = () => {
        if (formData.title.length < 3) return "Title must be 3-100 characters.";
        if (formData.description.length < 10) return "Description must be at least 10 characters.";
        
        // Date check
        const selectedDate = new Date(formData.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Due Date cannot be in the past.";
        
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await API.post('/tasks', formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            onTaskAdded(); // Refresh the list
            // Reset form
            setFormData({ title: '', description: '', priority: 'Low', dueDate: '', assignedTo: '' });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create task. Check server connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            {/* --- POPUP NOTIFICATION UI --- */}
            {error && (
                <div className="absolute -top-14 left-0 right-0 z-50 animate-fade-in-down">
                    <div className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center justify-center space-x-3 border-b-4 border-red-700">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {success && (
                <div className="absolute -top-14 left-0 right-0 z-50 animate-fade-in-down">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center justify-center space-x-3 border-b-4 border-emerald-700">
                        <span>🚀</span>
                        <span>Task Assigned Successfully!</span>
                    </div>
                </div>
            )}
            {/* --- END POPUP UI --- */}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-10 transition-all">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <span className="text-xl">✨</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800">Assign New Staff Task</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Task Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Repair AC in Suite 4" 
                            className={`w-full p-3 border rounded-2xl outline-none focus:ring-2 transition-all ${error && formData.title.length < 3 ? 'border-red-300 ring-red-100' : 'border-gray-200 focus:ring-purple-400'}`}
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Assigned To</label>
                        <input 
                            type="text" 
                            placeholder="Staff Member Name" 
                            className="w-full p-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            value={formData.assignedTo} 
                            onChange={e => setFormData({...formData, assignedTo: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Detailed Description</label>
                        <textarea 
                            placeholder="Provide details about the requirements..." 
                            className="w-full p-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 min-h-[100px] transition-all"
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Priority Level</label>
                        <select 
                            className="w-full p-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 bg-white font-medium"
                            value={formData.priority} 
                            onChange={e => setFormData({...formData, priority: e.target.value})}
                        >
                            <option value="Low">🟢 Low Priority</option>
                            <option value="Medium">🟡 Medium Priority</option>
                            <option value="High">🔴 High Priority</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-400 ml-1">Completion Deadline</label>
                        <input 
                            type="date" 
                            className="w-full p-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 font-medium"
                            value={formData.dueDate} 
                            onChange={e => setFormData({...formData, dueDate: e.target.value})} 
                            required 
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end items-center space-x-4">
                    {loading && <span className="text-sm text-gray-400 animate-pulse">Syncing with server...</span>}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-purple-100 transition-all active:scale-95 disabled:bg-gray-300"
                    >
                        {loading ? 'Assigning...' : 'Create Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;