import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewproject } from "../../redux/projectSlice";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";

const AddNewProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        id: Date.now().toString(), // Unique project ID
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "ongoing",
        priority: "high",
        listOfDevelopers: [], // Empty array initially
    });

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!project.name.trim() || !project.startDate || !project.endDate) {
            alert("Please fill in all required fields.");
            return;
        }

        dispatch(addNewproject(project)); // Dispatch RTK action
        navigate("/"); // Redirect to homepage or project list
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🆕 Add New Project</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Project Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={project.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={project.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={project.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Status:</label>
                        <select
                            name="status"
                            value={project.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Priority:</label>
                        <select
                            name="priority"
                            value={project.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        ➕ Add Project
                    </button>
                </form>

                <BackBtn/>
            </div>
        </div>
    );
};

export default AddNewProject;
