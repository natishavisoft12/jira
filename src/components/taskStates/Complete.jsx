import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Complete = () => {

    const navigate = useNavigate();
    const developer = useSelector((state) => state.projects.selectDevloper);

    if (!developer || !developer.listOfTasks) {
        return <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>;
    }

    const completedTasks = developer.listOfTasks.filter((task) => task.status === "completed");

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-green-600 mb-6">✅ Completed Tasks</h2>

            {completedTasks.length > 0 ? (
                <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                    <ul className="space-y-4">
                        {completedTasks.map((task) => (
                            <li 
                                key={task.taskId} 
                                className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg shadow-md text-gray-700 hover:bg-green-200 transition"
                            >
                                
                                <Link 
                                    to={`/task/${task.taskId}`} 
                                    className="font-semibold cursor-pointer text-green-700 hover:underline"
                                >
                                    {task.taskName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 text-lg mt-4">No completed tasks available.</p>
            )}

            {/* 🔙 Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                🔙 Go Back
            </button>
        </div>
    );
};

export default Complete;
