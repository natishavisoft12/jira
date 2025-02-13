import { createAsyncThunk } from "@reduxjs/toolkit";

export const projectsThunk = createAsyncThunk("jira/projects", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("/productData.json"); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (err) {
        console.error("Fetch Error:", err);
        return rejectWithValue(err.message);
    }
});
