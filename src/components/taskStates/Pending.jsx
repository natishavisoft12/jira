import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
const Pending = () => {
    const developer = useSelector((state) => state.projects.selectDevloper);
    const navigate = useNavigate()
    if (!developer || !developer.listOfTasks) {
        return <p className="text-center text-lg text-gray-500 mt-10">⏳ Loading tasks...</p>;  
    }

    const pendingdata = developer.listOfTasks.filter((task) => task.status === "pending");

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    ⏳ {developer.devName} Pending Tasks 
                </h2>

                {pendingdata.length > 0 ? (
                    <ul className="space-y-4">
                        {pendingdata.map((task) => (
                            <li key={task.taskId} className="bg-red-100 p-4 rounded-lg shadow-md border-l-4 border-red-500 hover:bg-red-200 transition">
                                 <Link to={`/task/${task.taskId}`} className="font-semibold cursor-pointer">
                                    {task.taskName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-4">
                        ✅ No pending tasks available.
                    </p> 
                )}
            </div>
            <BackBtn/>
        </div>
    );
};

export default Pending;
