import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectDevloperbyId } from "../../redux/projectSlice";
import Button from "../common/Button";

const DeveloperList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const { projects } = useSelector((state) => state.projects);
    const selectedProject = projects.find((project) => project.id === id);

    const handleSelectDevlopersById = (devID) => {
        dispatch(selectDevloperbyId(devID));
        navigate(`/alltask/${devID}`);
    };

    if (!selectedProject) {
        return <p className="text-center text-red-500 text-lg mt-10">🚨 Project not found!</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Developers in <span className="text-blue-500">{selectedProject.name}</span>
                </h2>
                
                <ul className="space-y-4">
                    {selectedProject.listOfDevelopers.map((dev) => (
                        <li 
                            key={dev.devID} 
                            className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md hover:bg-gray-300 transition cursor-pointer"
                            onClick={() => handleSelectDevlopersById(dev.devID)}
                        >
                            <div>
                                <p className="text-lg font-semibold">{dev.devName} - <span className="text-gray-600">{dev.role}</span></p>
                                <p className="text-sm text-gray-500">📧 {dev.email}</p>
                                <p className={`text-sm font-semibold ${dev.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                                    {dev.availability}
                                </p>
                                <p className="text-sm text-gray-500">📅 Assigned: {dev.assignedDate}</p>
                            </div>
                            <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                ❌ Remove
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex justify-center">
                    <Button text="➕ Add New Developer" variant="primary" />
                </div>
            </div>
        </div>
    );
};

export default DeveloperList;
