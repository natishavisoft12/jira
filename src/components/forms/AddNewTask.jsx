import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../redux/projectSlice";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import BackBtn from "../common/BackBtn";
const AddNewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectProject = useSelector((state) => state.projects);
  const developer = useSelector((state) => state.projects.selectDevloper);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    status: "pending",
    assignedTo: developer.devName,
    dueDate: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      taskId: Date.now().toString(),
      projectId: selectProject?.id,
      ...formData,
    };

    dispatch(addTask(newTask));
    console.log("Task Added:", newTask);

    navigate("/");

    setFormData({
      taskName: "",
      description: "",
      status: "pending",
      assignedTo: developer.devName,
      dueDate: "",
      priority: "Medium",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
  📝 Add New Task to <span className="text-blue-600">{developer.devName}</span>
       </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Task Name:</label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Assigned To:</label>
            <input
              type="text"
              name="assignedTo"
              readOnly
              value={formData.assignedTo}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            ➕ Add Task
          </button>
        </form>
        <BackBtn/>
      </div>
    </div>
  );
};

export default AddNewTask;
