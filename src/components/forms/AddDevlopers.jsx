import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDevloper } from "../../redux/projectSlice";


const AddDevelopers = () => {
    const dispatch = useDispatch();
    const selectedProject = useSelector((state) => state.projects.selectProject);

    const [formData, setFormData] = useState({
        devID: Date.now().toString(),
        devName: "",
        email: "",
        role: "",
        availability: "",
        assignedDate: "",
        taskList: [] // Always empty on creation
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
        setFormData({ devID: Date.now().toString(), devName: "", email: "", role: "", availability: "", assignedDate: "", taskList: [] });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md">
            <input type="text" name="devName" placeholder="Developer Name" value={formData.devName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
            <select name="availability" value={formData.availability} onChange={handleChange} required>
                <option value="">Select Availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
            </select>
            <input type="date" name="assignedDate" value={formData.assignedDate} onChange={handleChange} required />
            <button type="submit">Add Developer</button>
        </form>
    );
};

export default AddDevelopers;
