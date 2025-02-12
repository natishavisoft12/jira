import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";

const TaskList = () => {
    const developer = useSelector((state) => state.projects.selectDevloper);
    const navigate = useNavigate()
    console.log(developer.listOfTasks, "devvv");


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>

            <div className="flex space-x-6">
                <Link to="/complete" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    ✅ Completed
                </Link>
                <Link to="/pending" className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                    ⏳ Pending
                </Link>
                <Link to="/ongoing" className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                    🔄 Ongoing
                </Link>
                <Button text="Add New Task" click="/addNewtask"/>
            </div>
        </div>
    );
};

export default TaskList;
