import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import { addTask } from "../../redux/projectSlice";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ✅ Initialize navigate
const selectProject = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    status: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
        taskId: Date.now(),
        projectId: selectProject?.id,  // Link task to selected project
        ...formData,
    };
    console.log(newTask);
    
    dispatch(addTask(newTask));  // ✅ Dispatch action
    console.log("Task Added:", newTask);

    // ✅ Redirect to another page after submission
    navigate("/"); 

    // Reset form
    setFormData({
      taskName: "",
      description: "",
      status: "",
      assignedTo: "",
      dueDate: "",
      priority: "Medium",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Task Name:</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Assigned To:</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
