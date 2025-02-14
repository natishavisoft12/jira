import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogletasks } from "react-icons/si";
import BackBtn from "../common/BackBtn";
const Complete = () => {
    const navigate = useNavigate();
    const developer = useSelector((state) => state.projects.selectDevloper);

    if (!developer || !developer.listOfTasks) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
                <p className="text-white text-xl font-semibold bg-gray-800 px-6 py-3 rounded-lg shadow-md">
                    Loading...
                </p>
            </div>
        );
    }

    const completedTasks = developer.listOfTasks.filter((task) => task.status === "completed");

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
            <h2 className="text-4xl font-extrabold text-white mb-6 bg-green-700 px-6 py-2 rounded-lg shadow-md flex gap-2">
                <SiGoogletasks/> Completed Tasks by {developer.devName}
            </h2>

            {completedTasks.length > 0 ? (
                <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
                    <ul className="space-y-4">
                        {completedTasks.map((task) => (
                            <li
                                key={task.taskId}
                                className="bg-green-100 border-l-4 border-green-600 p-5 rounded-lg shadow-md text-gray-800 hover:bg-green-200 transition transform hover:scale-105 duration-300"
                            >
                                <Link
                                    to={`/task/${task.taskId}`}
                                    className="font-semibold text-green-700 text-lg hover:underline"
                                >
                                    {task.taskName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-white text-xl mt-6 bg-gray-900 px-5 py-3 rounded-lg shadow-md">
                    No completed tasks available. {developer.devName}
                </p>
            )}

            
            <BackBtn/>
        </div>
    );
};

export default Complete;
