import React from 'react';

const TaskItem = ({ task, isAdmin, onDelete, onStatusUpdate }) => {
    // FR-04: Priority badge color logic
    const priorityStyles = {
        High: "bg-red-100 text-red-700 border border-red-200",
        Medium: "bg-amber-100 text-amber-700 border border-amber-200",
        Low: "bg-green-100 text-green-700 border border-green-200"
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{task.title}</h4>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                        {task.priority}
                    </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-2">👤</span>
                        <span>Assigned to: <span className="font-semibold text-gray-700">{task.assignedTo}</span></span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-2">📅</span>
                        <span>Due Date: <span className="font-semibold text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span></span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                {/* FR-05: Status Dropdown - Available to both Admin and Staff */}
                <div className="flex flex-col">
                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1">Update Status</label>
                    <select
                        value={task.status}
                        onChange={(e) => onStatusUpdate(task._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-md p-1 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* FR-06: Delete Button - ONLY visible to Admins */}
                {isAdmin && (
                    <button 
                        onClick={() => onDelete(task._id)} 
                        className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm"
                        title="Delete Task"
                    >
                        <span className="text-sm font-bold">🗑️ Delete</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskItem;