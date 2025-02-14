import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
const TaskDetails = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const storedProject = JSON.parse(localStorage.getItem("project"));
        const storedDeveloper = JSON.parse(localStorage.getItem("devloper"));

        if (storedProject && storedDeveloper) {
            const project = storedProjects.find((proj) => proj.id === storedProject.id);
            if (project) {
                const developer = project.listOfDevelopers?.find((dev) => dev.devID === storedDeveloper.devID);
                if (developer) {
                    setTasks(developer.listOfTasks || []);
                }
            }
        }
    }, []);

    const developer = useSelector((state) => state.projects.selectDevloper);
    const task = developer?.listOfTasks?.find((t) => t.taskId === taskId);

    if (!task) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-medium text-gray-700 bg-red-100 px-6 py-3 rounded-lg shadow">
                    ⚠ Task not found!
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{task.taskName}</h2>

                <div className="p-4 bg-gray-100 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-base font-medium">Status:</p>
                        <span
                            className={`px-3 py-1 text-sm font-semibold text-white rounded-lg 
                            ${task.status === "completed" ? "bg-green-500" : 
                            task.status === "pending" ? "bg-red-500" : "bg-yellow-500"}`}
                        >
                            {task.status}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-base font-medium">Priority:</p>
                        <span
                            className={`px-3 py-1 text-sm font-semibold text-white rounded-lg 
                            ${task.priority === "High" ? "bg-red-600" : 
                            task.priority === "Medium" ? "bg-yellow-500" : "bg-blue-500"}`}
                        >
                            {task.priority}
                        </span>
                    </div>

                    <p className="text-gray-700 text-base">
                        <b>Description:</b> {task.description || "No description available"}
                    </p>

                    <p className="text-gray-700 text-base">
                        <b>Assigned To:</b> {task.assignedTo || "Not Assigned"}
                    </p>

                    <p className="text-gray-700 text-base">
                        <b>Due Date:</b> {task.dueDate || "No Due Date"}
                    </p>
                </div>

                <BackBtn/>
            </div>
        </div>
    );
};

export default TaskDetails;
