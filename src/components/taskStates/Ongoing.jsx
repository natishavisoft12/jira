import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
const Ongoing = () => {
    const developer = useSelector((state) => state.projects.selectDevloper);
    const navigate = useNavigate()

    if (!developer || !developer.listOfTasks) {
        return <p className="text-center text-lg text-gray-500 mt-10">⏳ Loading tasks...</p>;  // 🔥 Prevent crash on refresh
    }

    const ongoingData = developer.listOfTasks.filter((task) => task.status === "in-progress");

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    🛠️ Ongoing Tasks
                </h2>

                {ongoingData.length > 0 ? (
                    <ul className="space-y-4">
                        {ongoingData.map((task) => (
                            <li key={task.taskId} className="bg-yellow-100 p-4 rounded-lg shadow-md border-l-8 border-yellow-500 hover:bg-yellow-200 transition">
                               
                                <Link to={`/task/${task.taskId}`} className="font-semibold cursor-pointer">
                                    {task.taskName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-4">
                        🚀 No ongoing tasks available.
                    </p> 
                )}
            </div>
            <BackBtn/>
        </div>
    );
};

export default Ongoing;
