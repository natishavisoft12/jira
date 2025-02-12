import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
    const { taskId } = useParams(); // 🔥 Get taskId from URL
    const navigate = useNavigate();

    // Redux se task fetch karna
    const developer = useSelector((state) => state.projects.selectDevloper);
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
// add: (state, action) => {
//     const newpro = {
//         "Project_id": state.data.length + 1,
//         "Project_Name": action.payload.title,
//         "Project_Description": action.payload.dis,
//         "start_date": "12-07-2022",
//         "end_date": "",
//         "status": "IN PROGRESS",
//         "Developers": []
//     }
//     state.data.push(newpro)

//     toast.success("Project added successfully!", {
//         position: "top-center",
//         closeOnClick: true

//     })
//     console.log("done")
// },