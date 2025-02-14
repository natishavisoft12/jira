import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDevloper } from "../../redux/projectSlice";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
import { IoIosAddCircleOutline } from "react-icons/io";
const AddDevelopers = () => {
    const dispatch = useDispatch();
    const selectedProject = useSelector((state) => state.projects.selectProject);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        devID: Date.now().toString(),
        devName: "",
        email: "",
        role: "",
        availability: "",
        assignedDate: "",
        taskList: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProject) {
            alert("Please select a project first!");
            return;
        }
        dispatch(addDevloper(formData));
        setFormData({
            devID: Date.now().toString(),
            devName: "",
            email: "",
            role: "",
            availability: "",
            assignedDate: "",
            taskList: []
        });
        navigate("/")
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                    Add Developer in <span className=" text-blue-600">{selectedProject?.name || "Project"}</span>
                </h2>


                <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="devName" placeholder="Developer Name" value={formData.devName}
                        onChange={handleChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <input type="email" name="email" placeholder="Email" value={formData.email}
                        onChange={handleChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <input type="text" name="role" placeholder="Role" value={formData.role}
                        onChange={handleChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <select name="availability" value={formData.availability} onChange={handleChange}
                        required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Availability</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                    </select>

                    <input type="date" name="assignedDate" value={formData.assignedDate}
                        onChange={handleChange} required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <button type="submit"
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                   <IoIosAddCircleOutline/> Add Developer
                </button>
            </form>
            <BackBtn/>
        </>

    );
};

export default AddDevelopers;
