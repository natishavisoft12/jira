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

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Button text={"Add New Project"} click="/addNewProject" />
            
            <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">📂 Projects</h2>

                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.length === 0 ? (
                        <p className="text-gray-500">No projects found.</p>
                    ) : (
                        projects.map((project) => (
                            <div 
                                key={project.id} 
                                onClick={() => handleSelectProjectById(project.id)} 
                                className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                                
                                <p className={`mt-2 px-3 py-1 text-sm font-semibold text-white rounded-lg inline-block 
                                    ${project.status === "Completed" ? "bg-green-500" : 
                                    project.status === "In Progress" ? "bg-yellow-500" : 
                                    "bg-red-500"}`}>
                                    {project.status}
                                </p>

                                <p className="text-gray-600 mt-3">{project.description || "No description available."}</p>
                                
                                <p className="text-gray-500 mt-2"><b>Start:</b> {project.startDate || "N/A"}</p>
                                <p className="text-gray-500"><b>End:</b> {project.endDate || "N/A"}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
