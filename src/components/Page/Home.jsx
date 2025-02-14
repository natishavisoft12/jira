import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsThunk } from "../../redux/projectThunk";
import { selectProjectbyId, removeProject } from "../../redux/projectSlice";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { GrProjects } from "react-icons/gr";
import { MdDelete } from "react-icons/md"; // Import delete icon
import { FaProjectDiagram } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects, loading, error } = useSelector((state) => state.projects);

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(projectsThunk());
        }
    }, [dispatch, projects.length]); 

    const handleSelectProjectById = (id) => {
        dispatch(selectProjectbyId(id));
        navigate(`/developer/${id}`);
    };

    const handleRemoveProject = (id, event) => {
        event.stopPropagation(); 
        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(removeProject(id));
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen ">
                <p className="text-white text-lg font-semibold bg-gray-800 px-6 py-3 rounded-lg shadow-md">
                    ⏳ Loading projects...
                </p>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500 text-lg font-semibold bg-gray-100 px-6 py-3 rounded-lg shadow-md">
                    ❌ Error: {error}
                </p>
            </div>
        );

    return (
        <div className="min-h-screen py-10">
          
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold flex items-center gap-2 shadow-lg p-3 bg-white rounded-md">
                        <GrProjects className="text-gray-700 text-4xl" /> 
                        Projects
                    </h2>
                    <Button text={"➕ Add New Project"} click="/addNewProject" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length === 0 ? (
                        <p className="text-gray-200 text-lg text-center w-full">
                            No projects found.
                        </p>
                    ) : (
                        projects.map((project) => (
                            <div 
                                key={project.id} 
                                onClick={() => handleSelectProjectById(project.id)} 
                                className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-gray-900 flex justify-center items-center gap-2"> <FaProjectDiagram/>{project.name}</h3>
                                    
                                    <button 
                                        onClick={(event) => handleRemoveProject(project.id, event)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <MdDelete size={24} />
                                    </button>
                                </div>

                                <p className={`mt-3 px-4 py-2 text-sm font-semibold text-white rounded-full inline-block shadow-md
                                    ${project.status === "completed" ? "bg-green-600" : 
                                    project.status === "ongoing" ? "bg-yellow-500" : 
                                    "bg-red-500"}`}>
                                    {project.status}
                                </p>

                                <p className="text-gray-600 mt-3">{project.description || "No description available."}</p>
                                
                                <p className="text-gray-500 mt-2"><b>📅 Start:</b> {project.startDate || "N/A"}</p>
                                <p className="text-gray-500"><b>⏳ End:</b> {project.endDate || "N/A"}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
