import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
    const { taskId } = useParams(); 
    const navigate = useNavigate();
     const [tasks, setTasks] = useState([]);
    
        useEffect(() => {
            // Fetch projects from localStorage
            const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
            const storedProject = JSON.parse(localStorage.getItem("project")); 
            const storedDeveloper = JSON.parse(localStorage.getItem("devloper")); 
    
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
    
     
        const pendingTasks = tasks.filter((task) => task.status === "pending");
        const completedTasks = tasks.filter((task) => task.status === "completed");
        const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
        console.log(pendingTasks,"pend");
        console.log(completedTasks,"comp");
        
        

    // Redux se task fetch karna
    const developer = useSelector((state) => state.projects.selectDevloper);
    console.log(developer," olo");
    
    const task = developer?.listOfTasks?.find((t) => t.taskId === taskId);
    console.log(task," task jifdh");
    

    if (!task) {
        return <p className="text-center text-red-500 text-lg mt-10">⚠ Task not found!</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{task.taskName}</h2>
                
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-gray-700"><b>Status:</b> 
                        <span className={`ml-2 px-3 py-1 text-white rounded-lg text-sm font-semibold 
                            ${task.status === "completed" ? "bg-green-500" : 
                            task.status === "pending" ? "bg-red-500" : 
                            "bg-yellow-500"}`}>
                            {task.status}
                        </span>
                    </p>

                    <p className="text-gray-700 mt-2"><b>Priority:</b> 
                        <span className={`ml-2 px-3 py-1 text-white rounded-lg text-sm font-semibold 
                            ${task.priority === "High" ? "bg-red-600" : 
                            task.priority === "Medium" ? "bg-yellow-500" : 
                            "bg-blue-500"}`}>
                            {task.priority}
                        </span>
                    </p>

                    <p className="text-gray-700 mt-2"><b>Description:</b> {task.description || "No description available"}</p>
                    <p className="text-gray-700 mt-2"><b>Assigned To:</b> {task.assignedTo || "Not Assigned"}</p>
                    <p className="text-gray-700 mt-2"><b>Due Date:</b> {task.dueDate || "No Due Date"}</p>
                </div>

                <button 
                    onClick={() => navigate(-1)} 
                    className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full">
                    🔙 Go Back
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;
