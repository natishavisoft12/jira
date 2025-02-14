import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeDeveloper, selectDevloperbyId } from "../../redux/projectSlice";
import Button from "../common/Button";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
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

    const handleRemoveDeveloper = (devID) => {
        dispatch(removeDeveloper(devID));
    };
    
    if (!selectedProject) {
        return <p className="text-center text-red-500 text-lg mt-10">🚨 Project not found!</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                {/* Project Header */}
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    👨‍💻 Developers in <span className="text-blue-600">{selectedProject.name}</span>
                </h2>
                <p className="text-gray-600 text-center text-sm mb-4">Project ID: <span className="font-semibold">{selectedProject.id}</span></p>
                
                {/* Developer List */}
                <ul className="space-y-5">
                    {selectedProject.listOfDevelopers.map((dev) => (
                        <li 
                            key={dev.devID} 
                            className="flex justify-between items-center bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 cursor-pointer"
                            onClick={() => handleSelectDevlopersById(dev.devID)}
                        > 
                            
                            <div className="flex-1">
                            <h6 className="text-sm text-gray-500 font-medium"> Dev ID: <span className="font-semibold text-gray-700">{dev.devID}</span></h6>

                                <h3 className="text-lg font-bold text-gray-900">{dev.devName} 
                                    <span className="ml-2 text-gray-600 text-sm">({dev.role})</span>
                                </h3>
                                <p className="text-sm text-gray-500">📧 {dev.email}</p>
                                <p className={`text-sm font-semibold mt-1 ${dev.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                                    {dev.availability}
                                </p>
                                <p className="text-sm text-gray-500">📅 Assigned: {dev.assignedDate}</p>
                            </div>
                            
                            {/* Remove Button */}
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent parent `onClick`
                                    handleRemoveDeveloper(dev.devID);
                                }}
                            >
                                ❌ Remove
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Add Developer Button */}
                <div className="mt-8 flex justify-center">
                    <Button text="➕ Add New Developer" variant="primary" click="/addNewDevloper" />
                </div>
            </div>

            
           <BackBtn/>
        </div>
    );
};

export default DeveloperList;
