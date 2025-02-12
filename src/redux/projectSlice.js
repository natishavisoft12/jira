import { createSlice } from "@reduxjs/toolkit";
import { projectsThunk } from "./projectThunk";

const initialState = {
    projects: [],
    selectProject: JSON.parse(localStorage.getItem("project")) || null,
    selectDevloper: localStorage.getItem("devloper")|| null,
    taskList: [],
    loading: false,
    error: null
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        selectProjectbyId: (state, action) => {
            const foundProject = state.projects.find(proj => proj.id === action.payload) || null;
            state.selectProject = foundProject ? JSON.parse(JSON.stringify(foundProject)) : null;
            localStorage.setItem("project", JSON.stringify(state.selectProject));
        },
        selectDevloperbyId: (state, action) => {
            if (state.selectProject) {
                const foundDevloper = state.selectProject.listOfDevelopers?.find(dev => dev.devID === action.payload) || null;
                state.selectDevloper = foundDevloper ? JSON.parse(JSON.stringify(foundDevloper)) : null;
                localStorage.setItem("devloper", JSON.stringify(state.selectDevloper));
            }
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        addTask: (state, action) => {
            if (!state.selectProject || !state.selectDevloper) {
                console.error("🚨 No project or developer selected!");
                return;
            }

            // ✅ Extract values safely
            const projectid = state.selectProject?.id;
            const devloperid = state.selectDevloper?.devID;
            const devloper = JSON.parse(JSON.stringify(state.selectDevloper))
            console.log("Selected Developer:", JSON.parse(JSON.stringify(state.selectDevloper)));
            // const selectedProject = projects.find((project) => project.id === id);
            state.projects.selectDevloper.push(action.payload)
            console.log(state.projects.selectDevloper.push(action.payload),"  aa ja bai");
            
          
            // state.projects.selectDevloper
            
        
            

            // 🔹 Find project in Redux state
           

            // ✅ Create new task object
         
        }
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
                localStorage.setItem("projects", JSON.stringify(action.payload));
            })
            .addCase(projectsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { selectProjectbyId, selectDevloperbyId, addProject, addTask } = projectSlice.actions;
export default projectSlice.reducer;
