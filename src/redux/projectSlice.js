import { createSlice } from "@reduxjs/toolkit";
import { projectsThunk } from "./projectThunk";
import { useSelector } from "react-redux";

const initialState = {
    projects: JSON.parse(localStorage.getItem("projects")) || [],
    selectProject: JSON.parse(localStorage.getItem("project")) || null,
    selectDevloper: JSON.parse(localStorage.getItem("devloper")) || null,
    loading: false,
    error: null
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        selectProjectbyId: (state, action) => {
            state.selectProject = state.projects.find(proj => proj.id === action.payload) || null;
            localStorage.setItem("project", JSON.stringify(state.selectProject));
        },
        selectDevloperbyId: (state, action) => {
            if (state.selectProject) {
                state.selectDevloper = state.selectProject.listOfDevelopers?.find(dev => dev.devID === action.payload) || null;
                localStorage.setItem("devloper", JSON.stringify(state.selectDevloper));
            }
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },

        addTask: (state, action) => {
            // Ensure project and developer are selected
            if (!state.selectProject || !state.selectDevloper) {
                console.error("🚨 No project or developer selected!");
                return;
            }
        
            // Find the project using selectProject's id
            const project = state.projects.find(proj => proj.id === state.selectProject.id);
            if (!project) {
                console.error("🚨 Selected project not found!");
                return;
            }
        
            // Find the developer inside the project
            const developer = project.listOfDevelopers?.find(dev => dev.devID === state.selectDevloper.devID);
            if (!developer) {
                console.error("🚨 Selected developer not found in the project!");
                return;
            }
        
            // Initialize taskList if it doesn't exist
            developer.taskList = developer.taskList || [];
        
            // Add new task to developer's task list
            const newTask = action.payload;
            developer.listOfTasks.push(newTask);
        
            // Update project with the new developer's task list
            const updatedProject = {
                ...project,
                listOfDevelopers: project.listOfDevelopers.map(dev =>
                    dev.devID === developer.devID ? developer : dev
                ),
            };
        
            // Update state with new task and project
            state.selectDevloper = { ...developer };
            state.selectProject = updatedProject;
        
            // Update localStorage with new data
            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(updatedProject));
            localStorage.setItem("devloper", JSON.stringify(developer));
        
            console.log("✅ Task added successfully!", newTask);
            console.log("developer after task added", JSON.stringify(developer, null, 2));

        },
        

        addDevloper: (state, action) => {
            if (!state.selectProject) {
                console.error("🚨 No project selected!");
                return;
            }

            // Find project by ID
            const project = state.projects.find(proj => proj.id === state.selectProject.id);

            if (!project) {
                console.error("🚨 Selected project not found in state.projects!");
                console.log("Current Projects:", state.projects); // Debugging
                console.log("Selected Project ID:", state.selectProject.id); // Debugging
                return;
            }

            // Ensure listOfDevelopers exists
            project.listOfDevelopers = project.listOfDevelopers || [];

            // Push new developer
            project.listOfDevelopers.push(action.payload);

            // Update `selectProject` to reflect changes
            state.selectProject = { ...project };

            // Save to localStorage
            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(state.selectProject));

            console.log("✅ Developer added successfully!", action.payload);
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(projectsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(projectsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(projectsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { selectProjectbyId, selectDevloperbyId, addProject, addTask, addDevloper } = projectSlice.actions;
export default projectSlice.reducer;
