import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsThunk } from "../../redux/projectThunk";
import Button from "../common/Button";
import { selectProjectbyId } from "../../redux/projectSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects, loading, error } = useSelector((state) => state.projects);
    
    console.log("Projects in Redux:", projects);

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(projectsThunk());
        }
    }, [dispatch, projects.length]); 

    const handleSelectProjectById = (id) => {
        dispatch(selectProjectbyId(id));
        navigate(`/developer/${id}`);
    };

    if (loading) return <p className="text-center text-gray-700 text-lg">⏳ Loading projects...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">❌ Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800">📂 Projects</h2>
                    <Button text={"➕ Add New Project"} click="/addNewProject" />
                </div>

                {/* Project List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length === 0 ? (
                        <p className="text-gray-500 text-lg text-center w-full">No projects found.</p>
                    ) : (
                        projects.map((project) => (
                            <div 
                                key={project.id} 
                                onClick={() => handleSelectProjectById(project.id)} 
                                className="bg-white shadow-md rounded-lg p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>

                                {/* Status Badge */}
                                <p className={`mt-2 px-3 py-1 text-sm font-semibold text-white rounded-lg inline-block 
                                    ${project.status === "Completed" ? "bg-green-500" : 
                                    project.status === "In Progress" ? "bg-yellow-500" : 
                                    "bg-red-500"}`}>
                                    {project.status}
                                </p>

                                {/* Description */}
                                <p className="text-gray-600 mt-3">{project.description || "No description available."}</p>
                                
                                {/* Dates */}
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
