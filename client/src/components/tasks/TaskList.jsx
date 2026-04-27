import React, { useEffect, useState } from 'react';
import API from '../../api';
import AddTask from './AddTask';
import TaskItem from './TaskItem';

const TaskList = ({ userRole, userName }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = userRole === 'admin';

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const { data } = await API.patch(`/tasks/${id}/status`, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? data : t));
        } catch (err) { alert("Update failed"); }
    };

    // LOGIC: If Admin, show all. If Staff, show ONLY their assigned tasks.
    const displayedTasks = isAdmin 
        ? tasks 
        : tasks.filter(t => t.assignedTo?.toLowerCase() === userName?.toLowerCase());

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {/* ONLY Admin can see the AddTask form */}
            {isAdmin && <AddTask onTaskAdded={fetchTasks} />}

            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    {isAdmin ? "Global Task Monitor" : "My Personal Assignments"}
                </h3>
                {!isAdmin && <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">LOCKED TO: {userName}</span>}
            </div>
            
            {displayedTasks.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                    <p className="text-gray-400">No tasks currently assigned to you.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedTasks.map(task => (
                        <TaskItem 
                            key={task._id} 
                            task={task} 
                            isAdmin={isAdmin}
                            onStatusUpdate={handleStatusUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;