import { createSlice } from "@reduxjs/toolkit";
import { projectsThunk } from "./projectThunk";


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

            if (!state.selectProject || !state.selectDevloper) {

                return;
            }


            const project = state.projects.find(proj => proj.id === state.selectProject.id);
            if (!project) {

                return;
            }

            // Find the developer inside the project
            const developer = project.listOfDevelopers?.find(dev => dev.devID === state.selectDevloper.devID);
            if (!developer) {

                return;
            }


            if (!developer.listOfTasks) {
                developer.listOfTasks = [];
            }

            const newTask = action.payload;
            developer.listOfTasks.push(newTask); // 


            const updatedProject = {
                ...project,
                listOfDevelopers: project.listOfDevelopers.map(dev =>
                    dev.devID === developer.devID ? developer : dev
                ),
            };


            state.selectDevloper = { ...developer };
            state.selectProject = updatedProject;


            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(updatedProject));
            localStorage.setItem("devloper", JSON.stringify(developer));


        },



        addDevloper: (state, action) => {
            if (!state.selectProject) {

                return;
            }

            // Find project by ID
            const project = state.projects.find(proj => proj.id === state.selectProject.id);

            if (!project) {

                return;
            }

            // Ensure listOfDevelopers exists
            project.listOfDevelopers = project.listOfDevelopers || [];


            project.listOfDevelopers.push(action.payload);


            state.selectProject = { ...project };

            // Save to localStorage
            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(state.selectProject));


        },
        removeDeveloper: (state, action) => {
            if (!state.selectProject) return;


            const project = state.projects.find(proj => proj.id === state.selectProject.id);
            if (!project) return;

            project.listOfDevelopers = project.listOfDevelopers.filter(dev => dev.devID !== action.payload);


            state.selectProject = { ...project };


            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(state.selectProject));


        },

        addNewproject: (state, action) => {
            state.projects.push(action.payload)
            localStorage.setItem("projects", JSON.stringify(state.projects))
        },
        updateTaskStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;

            if (!state.selectProject || !state.selectDevloper) return;

            const project = state.projects.find(proj => proj.id === state.selectProject.id);
            if (!project) return;

            const developer = project.listOfDevelopers?.find(dev => dev.devID === state.selectDevloper.devID);
            if (!developer) return;

            const task = developer.listOfTasks?.find(t => t.taskId === taskId);
            if (!task) return;

            task.status = newStatus;

            state.selectDevloper = { ...developer };
            state.selectProject = {
                ...project,
                listOfDevelopers: project.listOfDevelopers.map(dev =>
                    dev.devID === developer.devID ? developer : dev
                ),
            };

            localStorage.setItem("projects", JSON.stringify(state.projects));
            localStorage.setItem("project", JSON.stringify(state.selectProject));
            localStorage.setItem("devloper", JSON.stringify(state.selectDevloper));
        },
        removeProject: (state, action) => {
            state.projects = state.projects.filter(proj => proj.id !== action.payload);
            
            
            if (state.selectProject?.id === action.payload) {
                state.selectProject = null;
                localStorage.removeItem("project");
            }
            
            localStorage.setItem("projects", JSON.stringify(state.projects));
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
                state.projects = action.payload.filter((proj, index, self) =>
                    index === self.findIndex(p => p.id === proj.id)
                );
                localStorage.setItem("projects", JSON.stringify(state.projects));
            })
            .addCase(projectsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { selectProjectbyId, selectDevloperbyId, addProject, addTask, addDevloper, addNewproject, removeDeveloper, updateTaskStatus,removeProject } = projectSlice.actions;
export default projectSlice.reducer;
