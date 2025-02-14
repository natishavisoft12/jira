import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch stored projects and selected project/developer from localStorage
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const storedProject = JSON.parse(localStorage.getItem("project"));
        const storedDeveloper = JSON.parse(localStorage.getItem("devloper"));

        if (storedProject && storedDeveloper) {
            const project = storedProjects.find(proj => proj.id === storedProject.id);
            if (project) {
                const developer = project.listOfDevelopers?.find(dev => dev.devID === storedDeveloper.devID);
                if (developer) {
                    setTasks(developer.listOfTasks || []);
                }
            }
        }
    }, []);

    // Categorize tasks based on status
    const pendingTasks = tasks.filter(task => task.status === "pending");
    const completedTasks = tasks.filter(task => task.status === "completed");
    const ongoingTasks = tasks.filter(task => task.status === "in-progress");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>

            {/* Status Filter Buttons */}
            <div className="flex space-x-6 mb-6">
                <Link to="/complete" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    ✅ Completed ({completedTasks.length})
                </Link>
                <Link to="/pending" className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                    ⏳ Pending ({pendingTasks.length})
                </Link>
                <Link to="/ongoing" className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                    🔄 Ongoing ({ongoingTasks.length})
                </Link>
                <button
                    onClick={() => navigate("/addNewtask")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    ➕ Add New Task
                </button>
            </div>

            {/* Task List */}
            <div className="w-full max-w-4xl space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-lg text-gray-500">No tasks available for this developer.</p>
                ) : (
                    tasks.map((task, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div className="text-xl font-medium text-gray-700">{task.taskName}</div>
                            <Link
                                to={`/task/${task.taskId}`}
                                className="font-semibold text-green-700 text-lg "
                            >


                                <span className={`px-4 py-2 text-white rounded-full capitalize 
                                ${task.status === "completed" ? "bg-green-500 bg-opacity-80" :
                                        task.status === "pending" ? "bg-red-500 bg-opacity-80" :
                                            "bg-yellow-500 bg-opacity-80"}`}>
                                    {task.status}
                                </span>
                            </Link>
                        </div>
                    ))
                )}
            </div>

          
           <BackBtn/>
        </div>
    );
};

export default TaskList;
