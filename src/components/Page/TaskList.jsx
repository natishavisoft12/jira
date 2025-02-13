import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch projects from localStorage
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const storedProject = JSON.parse(localStorage.getItem("project")); // Currently selected project
        const storedDeveloper = JSON.parse(localStorage.getItem("devloper")); // Currently selected developer

        if (storedProject && storedDeveloper) {
            // Find the selected project in localStorage
            const project = storedProjects.find(proj => proj.id === storedProject.id);
            if (project) {
                // Find the developer in the project
                const developer = project.listOfDevelopers?.find(dev => dev.devID === storedDeveloper.devID);
                if (developer) {
                    setTasks(developer.listOfTasks || []);
                }
            }
        }
    }, []);

    // Filter tasks based on status
    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const completedTasks = tasks.filter((task) => task.status === "completed");
    const ongoingTasks = tasks.filter((task) => task.status === "ongoing");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>

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
                <Button text="Add New Task" click="/addNewtask" />
            </div>

            {/* List of tasks */}
            <div className="w-full max-w-4xl space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-lg text-gray-500">No tasks available for this developer.</p>
                ) : (
                    tasks.map((task, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div className="text-xl font-medium text-gray-700">{task.taskName}</div>
                            <div className="flex space-x-4">
                                <span className={`px-4 py-2 text-white rounded-full ${task.status === "completed" ? "bg-green-500" : task.status === "pending" ? "bg-red-500" : "bg-yellow-500"}`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
